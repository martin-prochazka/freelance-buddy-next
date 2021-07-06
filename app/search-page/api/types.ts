import {z} from 'zod'

export const userSchema = z.object({
	name: z.string(),
	email: z.string(),
	avatar: z.string(),
})

const buddySchema = z.object({
	id: z.number(),
	user: userSchema,
	role: z.string(),
	skills: z.array(z.string()),
})

export const buddiesSchema = z.array(buddySchema)

const starredSchema = z.object({
	id: z.number(),
	buddyId: z.number(),
})

export const starredArraySchema = z.array(starredSchema)

export type UserEntity = z.infer<typeof userSchema>
export type BuddyEntity = z.infer<typeof buddySchema>
export type StarredEntity = z.infer<typeof starredSchema>
