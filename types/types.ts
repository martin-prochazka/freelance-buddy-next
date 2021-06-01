import * as t from 'io-ts'

const userCodec = t.type({
	id: t.number,
	name: t.string,
	email: t.string,
	avatar: t.string,
})

export const buddyCodec = t.type({
	id: t.number,
	user: userCodec,
	role: t.string,
	skills: t.array(t.string),
})

export type TBuddy = t.TypeOf<typeof buddyCodec>

export const starredCodec = t.type({
	id: t.number,
	buddyId: t.number,
})

export type TStarred = t.TypeOf<typeof starredCodec>
