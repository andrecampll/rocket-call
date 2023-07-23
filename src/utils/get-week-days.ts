type GetWeekDaysParams = {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('en', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) =>
      short
        ? weekDay.substring(0, 3).toUpperCase()
        : weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1)),
    )
}
