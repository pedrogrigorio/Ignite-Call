import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  console.log('teste')

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(req.body)

  const { user: userData } = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  console.log(bio)
  console.log(userData)

  // await prisma.user.update({
  //   where: {
  //     id: userData.id,
  //   },
  //   data: {
  //     bio,
  //   },
  // })

  return res.status(204).end()
}
