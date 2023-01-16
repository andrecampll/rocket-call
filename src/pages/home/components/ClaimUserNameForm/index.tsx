import { Button, TextInput } from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'
import * as S from './styles'

export const ClaimUserNameForm = () => {
  return (
    <S.Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="your-username" />
      <Button size="sm" type="submit">
        Submit
        <ArrowRight />
      </Button>
    </S.Form>
  )
}
