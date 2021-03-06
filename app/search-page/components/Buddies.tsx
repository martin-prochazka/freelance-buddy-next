import {Button, Center, Flex, Input, Spinner} from '@chakra-ui/react'
import {PAGE_ITEMS, useGetBuddies} from 'app/search-page/api/buddies'
import {useGetStarred} from 'app/search-page/api/starred'
import {Buddy} from 'app/search-page/components/Buddy'
import React, {useState} from 'react'
import {useDebounce} from 'use-debounce'

export const Buddies: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [searchDebounced] = useDebounce(searchValue, 500)

	const {buddies, fetchNextPage, isFetchingNextPage, hasNextPage, status} = useGetBuddies(searchDebounced)
	const {data: starred = []} = useGetStarred()

	return (
		<>
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
					buddies?.map((buddy) => <Buddy buddy={buddy} starred={starred} key={buddy.id} />)}
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
		</>
	)
}
