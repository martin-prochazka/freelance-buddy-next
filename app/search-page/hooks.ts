import {getBuddies} from 'app/search-page/api/buddies'
import {getStarred} from 'app/search-page/api/starred'
import {TBuddy, TStarred} from 'app/search-page/api/types'
import {GET_STARRED_KEY} from 'app/search-page/components/SearchBuddy'
import {useSession} from 'next-auth/client'
import {GET_BUDDIES_KEY} from 'pages'
import {useInfiniteQuery, useQuery} from 'react-query'

export const useGetStarred = () => {
	const [session] = useSession()

	return !session ? {data: []} : useQuery<TStarred[]>(GET_STARRED_KEY, getStarred)
}

export const useGetBuddies = (search: string) => {
	const {data, fetchNextPage, isFetchingNextPage, hasNextPage, status} = useInfiniteQuery<{
		data: TBuddy[]
		nextPage?: number
	}>([GET_BUDDIES_KEY, search], (params) => getBuddies({search, pageParam: params.pageParam ?? 1}), {
		getNextPageParam: (lastPage) => lastPage.nextPage,
	})

	const buddies = data?.pages?.map(({data}) => data).flat()

	return {buddies, fetchNextPage, isFetchingNextPage, hasNextPage, status}
}
