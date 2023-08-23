import { useCallback, useMemo } from 'react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { Button, Text, TextArea, TextInput } from '@rocket-ui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '../../../../../lib/axios'

import * as S from './styles'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

type ConfirmStepProps = {
  schedulingDate: Date
  toggleConfirmationStep: () => void
}

export const ConfirmStep = ({
  schedulingDate,
  toggleConfirmationStep,
}: ConfirmStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  const handleConfirmScheduling = useCallback(
    async (data: ConfirmFormData) => {
      const { name, email, observations } = data

      await api.post(`/users/${username}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate,
      })

      toggleConfirmationStep()
    },
    [username, schedulingDate, toggleConfirmationStep],
  )

  const describedDate = useMemo(
    () => dayjs(schedulingDate).format('DD[ of ]MMMM[ of ]YYYY'),
    [schedulingDate],
  )
  const describedTime = useMemo(
    () => dayjs(schedulingDate).format('HH:mm[h]'),
    [schedulingDate],
  )

  return (
    <S.ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <S.FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </S.FormHeader>

      <label>
        <Text size="sm">Complete Name</Text>
        <TextInput placeholder="Your name" {...register('name')} />
        {errors.name && (
          <S.FormError size="sm">{errors.name.message}</S.FormError>
        )}
      </label>

      <label>
        <Text size="sm">Email</Text>
        <TextInput
          type="email"
          placeholder="johndoe@gmail.com"
          {...register('email')}
        />
        {errors.email && (
          <S.FormError size="sm">{errors.email.message}</S.FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observations</Text>
        <TextArea placeholder="Observations" {...register('observations')} />
      </label>

      <S.FormActions>
        <Button
          type="button"
          variant="tertiary"
          onClick={toggleConfirmationStep}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirm
        </Button>
      </S.FormActions>
    </S.ConfirmForm>
  )
}
