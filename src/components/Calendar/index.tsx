import { CaretLeft, CaretRight } from 'phosphor-react'

import * as S from './styles'
import { getWeekDays } from '../../utils/get-week-days'

export const Calendar = () => {
  const shortWeekDays = getWeekDays({
    short: true,
  })

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.CalendarTitle>December 2023</S.CalendarTitle>

        <S.CalendarActions>
          <button>
            <CaretLeft />
          </button>

          <button>
            <CaretRight />
          </button>
        </S.CalendarActions>
      </S.CalendarHeader>

      <S.CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((day) => (
              <th key={day}>{day}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <S.CalendarDay disabled>1</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>2</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>3</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>4</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>5</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>6</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>7</S.CalendarDay>
            </td>
          </tr>
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  )
}
