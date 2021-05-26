import axios from 'axios'
import {isRight} from 'fp-ts/Either'
import * as t from 'io-ts'
import {buddyCodec, starredCodec} from 'types/types'

export const PAGE_ITEMS = 20

export const getBuddies = async ({search = '', pageParam}: {search?: string; pageParam?: number}) => {
	const {data} = await axios.get(`/api/buddies?q=${search}&_page=${pageParam}&_limit=${PAGE_ITEMS}`)
	// const {data} = await axios.get(`/api-json/buddies?q=${search}&_page=${pageParam}&_limit=${PAGE_ITEMS}`)

	const decoded = t.array(buddyCodec).decode(data)
	if (isRight(decoded)) {
		return data
	}

	throw new Error()
}

export const getStarred = async () => {
	const {data} = await axios.get('/api-json/starred')

	const decoded = t.array(starredCodec).decode(data)
	if (isRight(decoded)) {
		return data
	}

	throw new Error()
}

export const postStar = async (buddyId: number) => {
	await axios.post('/api-json/starred', {buddyId})
}

export const deleteStar = async (id: number) => {
	await axios.delete(`/api-json/starred/${id}`)
}
