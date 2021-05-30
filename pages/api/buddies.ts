import {PrismaClient, Prisma} from '@prisma/client'
import type {NextApiRequest, NextApiResponse} from 'next'
import {PAGE_ITEMS} from 'pages/api'
import {TBuddy} from 'types/types'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse<{data: TBuddy[]; nextPage?: number}>) => {
	const {
		query: {page: pageParam, count: countParam, search: searchParam},
		method,
	} = req

	if (method === 'GET') {
		const page = Number(pageParam ?? 1)
		const take = Number(countParam ?? PAGE_ITEMS)
		const skip = (page - 1) * take
		const search = searchParam as string

		const where: Prisma.BuddyWhereInput = {
			OR: [
				{
					role: {contains: search},
				},
				{
					skills: {
						some: {
							name: {
								contains: search,
							},
						},
					},
				},
			],
		}

		const dbBuddies = await prisma.buddy.findMany({
			include: {
				skills: true,
				user: true,
			},
			skip,
			take,
			where,
		})
		const dbCount = await prisma.buddy.count({where})

		const buddies: TBuddy[] = dbBuddies.map((buddy) => ({
			...buddy,
			user: buddy.user!,
			skills: buddy.skills.map(({name}) => name),
		}))
		const nextPage = dbCount > page * take ? page + 1 : undefined

		res.status(200).json({data: buddies, nextPage})
	}

	res.status(401)
}
