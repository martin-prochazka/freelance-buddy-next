import {SERVER_PATH} from 'app/SearchPage/api/constants'
import {starredCodec} from 'app/SearchPage/api/types'
import axios from 'axios'
import {isRight} from 'fp-ts/Either'
import * as t from 'io-ts'

export const getStarred = async () => {
	const {data} = await axios.get(`${SERVER_PATH}/api/starred`)

	const decoded = t.array(starredCodec).decode(data)
	if (isRight(decoded)) {
		return data
	}

	throw new Error()
}

export const postStar = async (buddyId: number) => {
	await axios.post('/api/starred', {buddyId})
}

export const deleteStar = async (id: number) => {
	await axios.delete(`/api/starred/${id}`)
}
