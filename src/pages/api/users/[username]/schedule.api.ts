import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'
import dayjs from 'dayjs'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  const username = String(req.query.username)

  if (!username) {
    return res.status(400).end() // Bad Request
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.string().datetime(),
  })

  const { name, email, observations, date } = createSchedulingBody.parse(
    req.body,
  )

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({
      message: 'Date is in the past.',
    })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res.status(400).json({
      message: 'Date is already scheduled.',
    })
  }

  await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return res.status(201).end()
}
