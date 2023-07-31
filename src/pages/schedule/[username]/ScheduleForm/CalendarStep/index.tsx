import { useMemo, useState } from 'react'

import { Calendar } from '../../../../../components/Calendar'
import * as S from './styles'
import dayjs from 'dayjs'

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = useMemo(
    () => (selectedDate ? dayjs(selectedDate).format('dddd') : null),
    [selectedDate],
  )
  const describedDate = useMemo(
    () => (selectedDate ? dayjs(selectedDate).format('DD[ of ] MMMM') : null),
    [selectedDate],
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
            <S.TimePickerItem>08:00 am</S.TimePickerItem>
            <S.TimePickerItem>09:00 am</S.TimePickerItem>
            <S.TimePickerItem>10:00 am</S.TimePickerItem>
            <S.TimePickerItem>11:00 am</S.TimePickerItem>
            <S.TimePickerItem>12:00 pm</S.TimePickerItem>
            <S.TimePickerItem>1:00 pm</S.TimePickerItem>
            <S.TimePickerItem>2:00 pm</S.TimePickerItem>
          </S.TimePickerList>
        </S.TimePicker>
      )}
    </S.Container>
  )
}
