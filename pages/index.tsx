import {getBuddies} from 'app/SearchPage/api/buddies'
import {getStarred} from 'app/SearchPage/api/starred'
import {GET_STARRED_KEY} from 'app/SearchPage/components/SearchBuddy'
import type {NextPageContext} from 'next'
import {getSession} from 'next-auth/client'
import {QueryClient} from 'react-query'
import {dehydrate} from 'react-query/hydration'
import {SearchPage} from 'app/SearchPage/components/SearchPage'

export const GET_BUDDIES_KEY = 'buddies'

export async function getServerSideProps(ctx: NextPageContext) {
	const queryClient = new QueryClient()
	const session = await getSession(ctx)

	await queryClient.prefetchQuery([GET_BUDDIES_KEY, ''], getBuddies)
	if (session) {
		await queryClient.prefetchQuery(GET_STARRED_KEY, getStarred)
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			session,
		},
	}
}

export default SearchPage
