import { Button, Heading, MultiStep, Text, TextInput } from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'

import * as S from './styles'

export default function Register() {
  return (
    <S.Wrapper>
      <S.Header>
        <Heading as="strong">Welcome to Ignite Call!</Heading>
        <Text>
          We need some information to create your profile! Oh, you can edit this
          information later.
        </Text>

        <MultiStep size={4} currentStep={1} />

        <S.Form as="form">
          <label>
            <Text size="sm">Username</Text>
            <TextInput prefix="ignite.com/" placeholder="your-username" />
          </label>

          <label>
            <Text size="sm">Full name</Text>
            <TextInput placeholder="Your name" />
          </label>

          <Button type="submit">
            Next <ArrowRight />
          </Button>
        </S.Form>
      </S.Header>
    </S.Wrapper>
  )
}
