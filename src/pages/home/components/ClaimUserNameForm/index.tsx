import { Button, TextInput } from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import * as S from './styles'

const claimUsernameSchema = z.object({
  username: z.string().min(3).max(20),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameSchema>

export const ClaimUserNameForm = () => {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  const handleClaimUsername = useCallback((data: ClaimUsernameFormData) => {
    console.log(data)
  }, [])

  return (
    <S.Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="your-username"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Submit
        <ArrowRight />
      </Button>
    </S.Form>
  )
}
