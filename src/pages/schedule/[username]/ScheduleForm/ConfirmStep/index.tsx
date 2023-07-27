import { Button, Text, TextArea, TextInput } from '@rocket-ui/react'
import * as S from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export const ConfirmStep = () => {
  const handleConfirmScheduling = () => {}

  return (
    <S.ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
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
        <TextInput placeholder="Your name" />
      </label>

      <label>
        <Text size="sm">Email</Text>
        <TextInput type="email" placeholder="johndoe@gmail.com" />
      </label>

      <label>
        <Text size="sm">Observations</Text>
        <TextArea placeholder="Observations" />
      </label>

      <S.FormActions>
        <Button type="button" variant="tertiary">
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </S.FormActions>
    </S.ConfirmForm>
  )
}
