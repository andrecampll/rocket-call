import { useCallback } from 'react'
import { Button, Heading, MultiStep, Text } from '@rocket-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'

import * as S from '../styles'
import * as LS from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = useCallback(async () => signIn('google'), [])

  const handleNavigateToNextStep = useCallback(async () => {
    await router.push('/register/time-intervals')
  }, [router])

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
          {isSignedIn ? (
            <Button size="sm" disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Connect <ArrowRight />
            </Button>
          )}
        </LS.ConnectItem>

        {hasAuthError && (
          <LS.AuthError size="sm">
            Error while trying to connect with Google. Check if you have allowed
            the app to access your calendar.
          </LS.AuthError>
        )}

        <Button
          onClick={handleNavigateToNextStep}
          type="submit"
          disabled={!isSignedIn}
        >
          Next <ArrowRight />
        </Button>
      </LS.ConnectBox>
    </S.Wrapper>
  )
}
