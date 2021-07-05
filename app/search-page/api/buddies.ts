import {SERVER_PATH} from 'app/search-page/api/constants'
import {buddiesSchema, Buddy} from 'app/search-page/api/types'
import axios from 'axios'

export const PAGE_ITEMS = 20

export const getBuddies = async ({
	search = '',
	pageParam,
}: {
	search?: string
	pageParam?: number
}): Promise<{data: Buddy[]; nextPage?: number}> => {
	const {data: response} = await axios.get(
		`${SERVER_PATH}/api/buddies?search=${search}&page=${pageParam}&count=${PAGE_ITEMS}`
	)

	const data = buddiesSchema.parse(response.data)
	const {nextPage} = response

	return {data, nextPage}
}
