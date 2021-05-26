import {Button, Center, Flex, Input, Spinner} from '@chakra-ui/react'
import {SearchBuddy} from 'components/SearchBuddy'
import React, {useState} from 'react'
import {useInfiniteQuery, QueryClient} from 'react-query'
import {getBuddies, PAGE_ITEMS} from 'pages/api'
import {TBuddy} from 'types/types'
import {useDebounce} from 'use-debounce'
import {dehydrate} from 'react-query/hydration'

export const GET_BUDDIES_KEY = 'buddies'

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery([GET_BUDDIES_KEY, ''], getBuddies)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

const SearchPage: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [searchDebounced] = useDebounce(searchValue, 500)

	const {data, fetchNextPage, status, isFetchingNextPage, hasNextPage} = useInfiniteQuery<TBuddy[]>(
		[GET_BUDDIES_KEY, searchDebounced],
		(params) => getBuddies({search: searchDebounced, pageParam: params.pageParam ?? 1}),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.length === PAGE_ITEMS && allPages.length + 1
			},
		}
	)

	if (status === 'error') {
		return <>An error ocurred</>
	}

	return (
		<Flex flexDirection='column' height='full' justifyContent='center' margin='5%'>
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
				{status === 'success' && data?.pages?.flat().map((buddy, j) => <SearchBuddy buddy={buddy} key={j} />)}
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
	)
}

export default SearchPage
