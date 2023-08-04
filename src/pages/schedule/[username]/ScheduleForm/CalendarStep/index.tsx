import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { Calendar } from '../../../../../components/Calendar'
import * as S from './styles'
import dayjs from 'dayjs'
import { api } from '../../../../../lib/axios'

type Availability = {
  possibleTimes: number[]
  availableTimes: number[]
}

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)
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

  useEffect(() => {
    if (!selectedDate) return

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => setAvailability(response.data))
  }, [selectedDate, username])

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
