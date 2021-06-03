import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/client'
import prisma from 'prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {method} = req

	const session = await getSession({req})
	if (!session) {
		res.status(401).end()
		return
	}

	const email = session.user?.email ?? undefined

	if (method === 'GET') {
		const starred = await prisma.starred.findMany({
			where: {
				user: {
					email,
				},
			},
			select: {buddyId: true, id: true},
		})

		res.status(200).json(starred)
		return
	} else if (method === 'POST') {
		const {buddyId} = req.body

		await prisma.starred.create({data: {buddyId, userId: email}})

		res.status(200).end()
	}

	res.status(403).end()
}
