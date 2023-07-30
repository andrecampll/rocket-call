import { useCallback, useMemo, useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'

import * as S from './styles'
import { getWeekDays } from '../../utils/get-week-days'
import dayjs from 'dayjs'

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

  const handlePreviousMonth = useCallback(() => {
    const dateOnPreviousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(dateOnPreviousMonth)
  }, [currentDate])

  const handleNextMonth = useCallback(() => {
    const dateOnNextMonth = currentDate.add(1, 'month')

    setCurrentDate(dateOnNextMonth)
  }, [currentDate])

  const shortWeekDays = getWeekDays({
    short: true,
  })

  const currentMonth = useMemo(() => currentDate.format('MMMM'), [currentDate])

  const currentYear = useMemo(() => currentDate.format('YYYY'), [currentDate])

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </S.CalendarTitle>

        <S.CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>

          <button onClick={handleNextMonth} title="Next month">
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
