import { Button, Text, TextArea, TextInput } from '@rocket-ui/react'
import * as S from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export const ConfirmStep = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const handleConfirmScheduling = (data: ConfirmFormData) => {
    console.log(data)
  }

  return (
    <S.ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <S.FormHeader>
        <Text>
          <CalendarBlank />
          22th of September 2023
        </Text>
        <Text>
          <Clock />
          10:00 AM
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
        <Button type="button" variant="tertiary">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirm
        </Button>
      </S.FormActions>
    </S.ConfirmForm>
  )
}
