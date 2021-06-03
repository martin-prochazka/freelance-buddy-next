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

	if (method === 'DELETE') {
		const {id} = req.query

		await prisma.starred.delete({where: {id: Number(id)}})
		res.status(200).end()
	}

	res.status(403).end()
}
