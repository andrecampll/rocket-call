import { useCallback, useMemo, useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'

import dayjs from 'dayjs'

import * as S from './styles'
import { getWeekDays } from '../../utils/get-week-days'

type CalendarWeek = {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

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

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => currentDate.set('date', index + 1))

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) =>
        currentDate
          .subtract(1, 'month')
          .set('date', currentDate.subtract(1, 'month').daysInMonth() - index),
      )
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 6 - lastWeekDay,
    }).map((_, index) => lastDayInCurrentMonth.add(index + 1, 'day'))

    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({ date, disabled: true })),
      ...daysInMonthArray.map((date) => ({ date, disabled: false })),
      ...nextMonthFillArray.map((date) => ({ date, disabled: true })),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  console.log(calendarWeeks)

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
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => (
                  <td key={date.toString()}>
                    <S.CalendarDay disabled={disabled}>
                      {date.get('date')}
                    </S.CalendarDay>
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  )
}
