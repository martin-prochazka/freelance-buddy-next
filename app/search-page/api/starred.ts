import {SERVER_PATH} from 'app/search-page/api/constants'
import {Starred, starredArraySchema} from 'app/search-page/api/types'
import axios from 'axios'

export const getStarred = async (): Promise<Starred[]> => {
	const {data} = await axios.get(`${SERVER_PATH}/api/starred`)

	const starred = starredArraySchema.parse(data)

	return starred
}

export const postStar = async (buddyId: number) => {
	await axios.post('/api/starred', {buddyId})
}

export const deleteStar = async (id: number) => {
	await axios.delete(`/api/starred/${id}`)
}
