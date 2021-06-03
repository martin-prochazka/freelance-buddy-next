import {Button, Center, Flex, Input, Spinner, Text} from '@chakra-ui/react'
import {GET_STARRED_KEY, SearchBuddy} from 'components/SearchBuddy'
import {signIn, signOut, useSession, getSession} from 'next-auth/client'
import {getBuddies, getStarred, PAGE_ITEMS} from 'pages/api'
import React, {useState} from 'react'
import {QueryClient, useInfiniteQuery, useQuery} from 'react-query'
import {dehydrate} from 'react-query/hydration'
import {TBuddy, TStarred} from 'types/types'
import {useDebounce} from 'use-debounce'
import type {NextPageContext} from 'next'

export const GET_BUDDIES_KEY = 'buddies'

export async function getServerSideProps(ctx: NextPageContext) {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery([GET_BUDDIES_KEY, ''], getBuddies)
	await queryClient.prefetchQuery(GET_STARRED_KEY, getStarred) // TODO Auth

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			session: await getSession(ctx),
		},
	}
}

const SearchPage: React.FC = () => {
	const [session] = useSession()
	const [searchValue, setSearchValue] = useState('')
	const [searchDebounced] = useDebounce(searchValue, 500)

	const {
		data: response,
		fetchNextPage,
		status,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery<{data: TBuddy[]; nextPage?: number}>(
		[GET_BUDDIES_KEY, searchDebounced],
		(params) => getBuddies({search: searchDebounced, pageParam: params.pageParam ?? 1}),
		{
			getNextPageParam: (lastPage) => lastPage.nextPage,
		}
	)

	const {data: starred = []} = useQuery<TStarred[]>(GET_STARRED_KEY, getStarred)

	if (status === 'error') {
		return <>An error occurred</>
	}

	return (
		<>
			<Flex flexDirection='column' height='full' justifyContent='center' marginX='5%'>
				<Flex flexDirection='row' marginBottom='5%' justifyContent='flex-end' alignItems='center'>
					{!session && (
						<Button onClick={() => signIn()} variant='link'>
							Sign in
						</Button>
					)}
					{session && (
						<>
							<Text fontSize='md' marginRight='2'>
								{session.user?.name}
							</Text>
							<Button onClick={() => signOut()} variant='link'>
								Sign out
							</Button>
						</>
					)}
				</Flex>
				<Center marginBottom='5%'>
					<Input
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						placeholder='Start typing role or skill to search'
						size='md'
						width='340px'
						backgroundColor='white'
						borderColor='gray.200'
					/>
				</Center>
				<Flex flexWrap='wrap' justifyContent='center' alignItems='center'>
					{status === 'loading' && <Spinner size='xl' color='gray' />}
					{status === 'success' &&
						response?.pages
							?.map(({data}) => data)
							.flat()
							.map((buddy, j) => <SearchBuddy buddy={buddy} starred={starred} key={j} />)}
				</Flex>
				<Center marginY='5%'>
					<Button
						onClick={() => fetchNextPage()}
						disabled={!hasNextPage || isFetchingNextPage}
						backgroundColor='gray.500'
						color='gray.50'
						_hover={{backgroundColor: 'gray.600'}}
					>
						{isFetchingNextPage
							? 'Loading more...'
							: hasNextPage
							? `Load more ${PAGE_ITEMS} Buddies`
							: 'Nothing more to load'}
					</Button>
				</Center>
			</Flex>
		</>
	)
}

export default SearchPage
