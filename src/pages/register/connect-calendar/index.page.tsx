// import { useCallback } from 'react'
import { Button, Heading, MultiStep, Text } from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'

import * as S from '../styles'
import * as LS from './styles'

export default function Register() {
  // const handleRegister = useCallback(async () => {

  // }, [])

  return (
    <S.Wrapper>
      <S.Header>
        <Heading as="strong">Connect your schedule</Heading>
        <Text>
          Connect your calendar to automatically check busy hours and new events
          as they are scheduled.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </S.Header>

      <LS.ConnectBox>
        <LS.ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar <ArrowRight />
          </Button>
        </LS.ConnectItem>

        <Button type="submit">
          Next <ArrowRight />
        </Button>
      </LS.ConnectBox>
    </S.Wrapper>
  )
}
