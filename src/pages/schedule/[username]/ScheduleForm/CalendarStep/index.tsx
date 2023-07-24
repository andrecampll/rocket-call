import { Calendar } from '../../../../../components/Calendar'
import * as S from './styles'

export const CalendarStep = () => {
  const isDateSelected = true

  return (
    <S.Container isTimePickerOpen={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <S.TimePicker>
          <S.TimePickerHeader>
            tuesday <span>20th September</span>
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
