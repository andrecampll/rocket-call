import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useCallback } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'

import * as S from '../styles'
import * as LS from './styles'

const timeIntervalSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 1,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 2,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 3,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 4,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const handleSetTimeIntervals = useCallback(async () => {}, [])

  return (
    <S.Wrapper>
      <S.Header>
        <Heading as="strong">Almost there</Heading>
        <Text>
          Define the time intervals you want to be available for meetings.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </S.Header>

      <LS.IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <LS.IntervalsContainer>
          {fields.map((field, index) => (
            <LS.Interval key={field.id}>
              <LS.IntervalDay>
                <Checkbox />
                <Text>{weekDays[field.weekDay]}</Text>
              </LS.IntervalDay>
              <LS.IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />

                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </LS.IntervalInputs>
            </LS.Interval>
          ))}
        </LS.IntervalsContainer>

        <Button type="submit">
          Next <ArrowRight />
        </Button>
      </LS.IntervalBox>
    </S.Wrapper>
  )
}
