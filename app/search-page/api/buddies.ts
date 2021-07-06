import {GET_BUDDIES_KEY, SERVER_PATH} from 'app/search-page/api/constants'
import {buddiesSchema, BuddyEntity} from 'app/search-page/api/types'
import axios from 'axios'
import {useInfiniteQuery} from 'react-query'

export const PAGE_ITEMS = 20

export const getBuddies = async ({
	search = '',
	pageParam,
}: {
	search?: string
	pageParam?: number
}): Promise<{data: BuddyEntity[]; nextPage?: number}> => {
	const {data: response} = await axios.get(
		`${SERVER_PATH}/api/buddies?search=${search}&page=${pageParam}&count=${PAGE_ITEMS}`
	)

	const data = buddiesSchema.parse(response.data)
	const {nextPage} = response

	return {data, nextPage}
}

export const useGetBuddies = (search: string) => {
	const {data, fetchNextPage, isFetchingNextPage, hasNextPage, status} = useInfiniteQuery<{
		data: BuddyEntity[]
		nextPage?: number
	}>([GET_BUDDIES_KEY, search], (params) => getBuddies({search, pageParam: params.pageParam ?? 1}), {
		getNextPageParam: (lastPage) => lastPage.nextPage,
	})

	const buddies = data?.pages?.map(({data}) => data).flat()

	return {buddies, fetchNextPage, isFetchingNextPage, hasNextPage, status}
}
