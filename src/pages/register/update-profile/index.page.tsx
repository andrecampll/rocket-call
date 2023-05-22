import { useCallback } from 'react'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@rocket-ui/react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '../../../lib/axios'

import * as RS from '../styles'
import * as S from './styles'
import { useSession } from 'next-auth/react'
import { unstable_getServerSession as getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { useRouter } from 'next/router'

const updateProfileForm = z.object({
  bio: z.string().max(160, { message: 'Bio must be less than 160 characters' }),
})

type UpdateProfileFormData = z.infer<typeof updateProfileForm>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileForm),
  })

  const session = useSession()
  const router = useRouter()

  const handleUpdateProfile = useCallback(
    async ({ bio }: UpdateProfileFormData) => {
      await api.put('/users/profile', {
        bio,
      })

      await router.push(`/schedule/${session?.data?.user.username}`)
    },
    [router, session?.data?.user.username],
  )

  return (
    <RS.Wrapper>
      <RS.Header>
        <Heading as="strong">Welcome to Ignite Call!</Heading>
        <Text>
          We need some information to create your profile! Oh, you can edit this
          information later.
        </Text>
      </RS.Header>

      <MultiStep size={4} currentStep={4} />

      <S.ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Profile Picture</Text>
          <Avatar
            src={session?.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size="sm">About</Text>
          <TextArea {...register('bio')} />

          <S.FormAnnotation size="sm">
            Tell us a little about yourself. This will appear on your profile.
          </S.FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finish <ArrowRight />
        </Button>
      </S.ProfileBox>
    </RS.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
