import {SERVER_PATH} from 'app/SearchPage/api/constants'
import {buddyCodec} from 'app/SearchPage/api/types'
import axios from 'axios'
import {isRight} from 'fp-ts/Either'
import * as t from 'io-ts'

export const PAGE_ITEMS = 20

export const getBuddies = async ({search = '', pageParam}: {search?: string; pageParam?: number}) => {
	const {data: response} = await axios.get(
		`${SERVER_PATH}/api/buddies?search=${search}&page=${pageParam}&count=${PAGE_ITEMS}`
	)

	const decoded = t.array(buddyCodec).decode(response.data)
	if (isRight(decoded)) {
		const {data, nextPage} = response
		return {data, nextPage}
	}

	throw new Error()
}
