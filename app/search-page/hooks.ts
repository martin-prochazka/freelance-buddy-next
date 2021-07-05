import {getBuddies} from 'app/search-page/api/buddies'
import {getStarred} from 'app/search-page/api/starred'
import {Buddy, Starred} from 'app/search-page/api/types'
import {GET_STARRED_KEY} from 'app/search-page/components/SearchBuddy'
import {useSession} from 'next-auth/client'
import {GET_BUDDIES_KEY} from 'pages'
import {useInfiniteQuery, useQuery} from 'react-query'

export const useGetStarred = () => {
	const [session] = useSession()
	return session ? useQuery<Starred[]>(GET_STARRED_KEY, getStarred) : {data: []}
}

export const useGetBuddies = (search: string) => {
	const {data, fetchNextPage, isFetchingNextPage, hasNextPage, status} = useInfiniteQuery<{
		data: Buddy[]
		nextPage?: number
	}>([GET_BUDDIES_KEY, search], (params) => getBuddies({search, pageParam: params.pageParam ?? 1}), {
		getNextPageParam: (lastPage) => lastPage.nextPage,
	})

	const buddies = data?.pages?.map(({data}) => data).flat()

	return {buddies, fetchNextPage, isFetchingNextPage, hasNextPage, status}
}
