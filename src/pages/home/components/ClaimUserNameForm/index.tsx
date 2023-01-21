import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button, Text, TextInput } from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import * as S from './styles'

const claimUsernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(20)
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Username can only contain letters and dashes.',
    })
    .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameSchema>

export const ClaimUserNameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameSchema),
  })

  const router = useRouter()

  const handleClaimUsername = useCallback(
    async (data: ClaimUsernameFormData) => {
      const { username } = data

      await router.push(`/register?username=${username}`)
    },
    [router],
  )

  return (
    <>
      <S.Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="your-username"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Submit
          <ArrowRight />
        </Button>
      </S.Form>

      <S.FormAnnotation>
        <Text size="sm">
          {errors.username?.message
            ? errors.username.message
            : 'Enter the desired username'}
        </Text>
      </S.FormAnnotation>
    </>
  )
}
