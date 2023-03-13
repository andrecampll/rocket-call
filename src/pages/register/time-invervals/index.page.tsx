import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'

import * as S from '../styles'
import * as LS from './styles'

export default function TimeIntervals() {
  return (
    <S.Wrapper>
      <S.Header>
        <Heading as="strong">Almost there</Heading>
        <Text>
          Define the time intervals you want to be available for meetings.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </S.Header>

      <LS.IntervalBox as="form">
        <LS.IntervalsContainer>
          <LS.Interval>
            <LS.IntervalDay>
              <Checkbox />
              <Text>Monday</Text>
            </LS.IntervalDay>
            <LS.IntervalInputs>
              <TextInput size="sm" type="time" step={60} />

              <TextInput size="sm" type="time" step={60} />
            </LS.IntervalInputs>
          </LS.Interval>

          <LS.Interval>
            <LS.IntervalDay>
              <Checkbox />
              <Text>Tuesday</Text>
            </LS.IntervalDay>
            <LS.IntervalInputs>
              <TextInput size="sm" type="time" step={60} />

              <TextInput size="sm" type="time" step={60} />
            </LS.IntervalInputs>
          </LS.Interval>
        </LS.IntervalsContainer>

        <Button type="submit">
          Next <ArrowRight />
        </Button>
      </LS.IntervalBox>
    </S.Wrapper>
  )
}
