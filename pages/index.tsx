import {getBuddies} from 'app/search-page/api/buddies'
import type {NextPageContext} from 'next'
import {getSession} from 'next-auth/client'
import {QueryClient} from 'react-query'
import {dehydrate} from 'react-query/hydration'
import {Buddies} from 'app/search-page/components/Buddies'
import {GET_BUDDIES_KEY} from 'app/search-page/api/constants'

export async function getServerSideProps(ctx: NextPageContext) {
	const queryClient = new QueryClient()
	const session = await getSession(ctx)

	await queryClient.prefetchQuery([GET_BUDDIES_KEY, ''], getBuddies)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			session,
		},
	}
}

export default Buddies
