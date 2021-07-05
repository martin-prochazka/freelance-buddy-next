import {z} from 'zod'

export const userSchema = z.object({
	name: z.string(),
	email: z.string(),
	avatar: z.string(),
})

export type User = z.infer<typeof userSchema>

const buddySchema = z.object({
	id: z.number(),
	user: userSchema,
	role: z.string(),
	skills: z.array(z.string()),
})

export const buddiesSchema = z.array(buddySchema)

export type Buddy = z.infer<typeof buddySchema>

const starredSchema = z.object({
	id: z.number(),
	buddyId: z.number(),
})

export const starredArraySchema = z.array(starredSchema)

export type Starred = z.infer<typeof starredSchema>
