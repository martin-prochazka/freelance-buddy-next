import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
	providers: [
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				username: {label: 'Username', type: 'text'},
				password: {label: 'Password', type: 'password'},
			},
			async authorize(credentials) {
				const {email, password} = credentials as any

				const user = await prisma.user.findFirst({where: {email, password}})

				if (user) {
					return user
				}

				return null
			},
		}),
	],
})
