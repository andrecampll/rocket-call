import { Button, Heading, MultiStep, Text, TextInput } from '@rocket-ui/react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(20)
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Username can only contain letters and dashes',
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleRegister = async (data: RegisterFormData) => {
    console.log(data)
  }

  return (
    <S.Wrapper>
      <S.Header>
        <Heading as="strong">Welcome to Ignite Call!</Heading>
        <Text>
          We need some information to create your profile! Oh, you can edit this
          information later.
        </Text>

        <MultiStep size={4} currentStep={1} />

        <S.Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Username</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="your-username"
              {...register('username')}
            />
            {errors.username && (
              <S.FormError size="sm">{errors.username.message}</S.FormError>
            )}
          </label>

          <label>
            <Text size="sm">Full name</Text>
            <TextInput placeholder="Your name" {...register('name')} />
            {errors.name && (
              <S.FormError size="sm">{errors.name.message}</S.FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Next <ArrowRight />
          </Button>
        </S.Form>
      </S.Header>
    </S.Wrapper>
  )
}
