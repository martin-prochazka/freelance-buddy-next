import {Center} from '@chakra-ui/react'
import {BuddyBox} from 'components/BuddyBox'
import {SearchBuddyHeader} from 'components/SearchBuddyHeader'
import {Skill} from 'components/Skill'
import {SkillBox} from 'components/SkillBox'
import {StarButton} from 'components/StarButton'
import React, {useMemo} from 'react'
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query'
import {deleteStar, getStarred, postStar, TBuddy, TStarred} from 'pages/api'
import {dehydrate} from 'react-query/hydration'

export const GET_STARRED_KEY = 'starred'

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(GET_STARRED_KEY, getStarred)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export const SearchBuddy: React.FC<{buddy: TBuddy}> = ({buddy}) => {
	const queryClient = useQueryClient()

	const {data: starred = []} = useQuery<TStarred[]>(GET_STARRED_KEY, getStarred)
	const starredIds = useMemo(() => starred.map(({buddyId}) => buddyId), [starred])
	const isStarred = useMemo(() => starredIds.includes(buddy.id), [buddy.id, starredIds])

	const addStarMutation = useMutation(postStar, {
		onSuccess: () => {
			queryClient.invalidateQueries(GET_STARRED_KEY)
		},
	})

	const deleteStarMutation = useMutation(deleteStar, {
		onSuccess: () => {
			queryClient.invalidateQueries(GET_STARRED_KEY)
		},
	})

	const onStarClick = () => {
		if (!isStarred) {
			addStarMutation.mutate(buddy.id)
		} else {
			const id = starred.find(({buddyId}) => buddyId === buddy.id)?.id
			id && deleteStarMutation.mutate(id)
		}
	}

	return (
		<BuddyBox>
			<SearchBuddyHeader avatar={buddy.user.avatar} name={buddy.user.name} role={buddy.role} />
			<SkillBox>
				{buddy.skills.map((skill, index) => (
					<Skill skill={skill} key={index} />
				))}
			</SkillBox>
			<Center>
				<StarButton isStarred={isStarred} onClick={onStarClick} />
			</Center>
		</BuddyBox>
	)
}
