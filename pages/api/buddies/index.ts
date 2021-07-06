import {Prisma} from '@prisma/client'
import {PAGE_ITEMS} from 'app/search-page/api/buddies'
import {BuddyEntity} from 'app/search-page/api/types'
import {getNumber} from 'app/utils/api-utils'
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from 'prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse<{data: BuddyEntity[]; nextPage?: number}>) => {
	const {
		query: {page: pageParam, count: countParam, search: searchParam},
		method,
	} = req

	if (method === 'GET') {
		const page = getNumber(pageParam) ?? 1
		const take = getNumber(countParam) ?? PAGE_ITEMS
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
			skip,
			take,
			where,
			select: {
				id: true,
				skills: true,
				role: true,
				user: {
					select: {
						avatar: true,
						email: true,
						name: true,
					},
				},
			},
		})
		const dbCount = await prisma.buddy.count({where})

		const buddies: BuddyEntity[] = dbBuddies.map((buddy) => ({
			...buddy,
			user: buddy.user!,
			skills: buddy.skills.map(({name}) => name),
		}))
		const nextPage = dbCount > page * take ? page + 1 : undefined

		res.status(200).json({data: buddies, nextPage})
		return
	}

	res.status(403).end()
}
