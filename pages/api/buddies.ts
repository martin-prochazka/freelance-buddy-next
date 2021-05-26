import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from '@prisma/client'
import {TBuddy} from 'types/types'

const prisma  = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse<TBuddy[]>) => {
    const {
        query: { _page, _limit },
        method,
    } = req

    console.log(_page, _limit)

    if (method === 'GET') {
        const dbBuddies = await prisma.buddy.findMany({include: {skills: true, user: true}})

        const buddies: TBuddy[] = dbBuddies.map((buddy) => ({...buddy, user: buddy.user!, skills: buddy.skills.map(({name}) => name)}))

        res.status(200).json(buddies)
    }

    res.status(401)
}
