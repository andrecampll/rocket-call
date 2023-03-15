import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@rocket-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useCallback, useMemo } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { days } from '../../../utils/days'
import { getWeekDays } from '../../../utils/get-week-days'

import * as S from '../styles'
import * as LS from './styles'

const timeIntervalSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().int().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'You must select at least one week day',
    }),
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeIntervalSchema),
    defaultValues: {
      intervals: days,
    },
  })

  const weekDays = useMemo(() => getWeekDays(), [])

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const handleSetTimeIntervals = useCallback(
    async (data: TimeIntervalsFormData) => {
      console.log(data)
    },
    [],
  )

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
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      checked={field.value}
                    />
                  )}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </LS.IntervalDay>
              <LS.IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />

                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </LS.IntervalInputs>
            </LS.Interval>
          ))}
        </LS.IntervalsContainer>

        {errors.intervals && (
          <LS.FormError size="sm">{errors.intervals.message}</LS.FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Next <ArrowRight />
        </Button>
      </LS.IntervalBox>
    </S.Wrapper>
  )
}
