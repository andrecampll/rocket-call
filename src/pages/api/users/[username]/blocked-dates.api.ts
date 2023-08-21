import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end() // Method Not Allowed
  }

  const username = String(req.query.username)

  if (!username) {
    return res.status(400).end() // Bad Request
  }

  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ messagte: 'Year or month not specified.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (weekDay) =>
      !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      ),
  )

  const blockedDatesRaw: Array<{ date: string }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
    
    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = EXTRACT(DOW FROM S.date)

    WHERE S.user_id = ${user.id}
      AND TO_CHAR(S.date, 'YYYY-MM') = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM S.date),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

    HAVING COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)
  `

  const blockedDates = blockedDatesRaw.map((item) => Number(item.date))

  return res.json({ blockedWeekDays, blockedDates })
}
