import {Prisma} from '@prisma/client'
import {PAGE_ITEMS} from 'app/SearchPage/api/buddies'
import {TBuddy} from 'app/SearchPage/api/types'
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from 'prisma/db'

const getNumber = (param: string | string[]): number | null => {
	if (Array.isArray(param)) {
		return null
	}

	const number = Number(param)

	if (Number.isNaN(number)) {
		return null
	}

	return number
}

export default async (req: NextApiRequest, res: NextApiResponse<{data: TBuddy[]; nextPage?: number}>) => {
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

		const buddies: TBuddy[] = dbBuddies.map((buddy) => ({
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
