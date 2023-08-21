import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { Calendar } from '../../../../../components/Calendar'
import * as S from './styles'
import dayjs from 'dayjs'
import { api } from '../../../../../lib/axios'
import { useQuery } from '@tanstack/react-query'

type Availability = {
  possibleTimes: number[]
  availableTimes: number[]
}

type CalendarStepProps = {
  onSelectDateTime: (date: Date) => void
}

export const CalendarStep = ({ onSelectDateTime }: CalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = useMemo(
    () => (selectedDate ? dayjs(selectedDate).format('dddd') : null),
    [selectedDate],
  )
  const describedDate = useMemo(
    () => (selectedDate ? dayjs(selectedDate).format('DD[ of ] MMMM') : null),
    [selectedDate],
  )

  const selectedDateWithoutTime = useMemo(
    () => (selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null),
    [selectedDate],
  )

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  const handleSelectTime = useCallback(
    (hour: string) => {
      const dateTime = dayjs(selectedDate)
        .set('hour', Number(hour))
        .startOf('hour')
        .toDate()

      onSelectDateTime(dateTime)
    },
    [onSelectDateTime, selectedDate],
  )

  return (
    <S.Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {isDateSelected && (
        <S.TimePicker>
          <S.TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </S.TimePickerHeader>

          <S.TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <S.TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(String(hour))}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </S.TimePickerItem>
            ))}
          </S.TimePickerList>
        </S.TimePicker>
      )}
    </S.Container>
  )
}
