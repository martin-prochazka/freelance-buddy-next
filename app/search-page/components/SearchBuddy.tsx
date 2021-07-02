import {Center} from '@chakra-ui/react'
import {BuddyBox} from 'app/search-page/components/BuddyBox'
import {SearchBuddyHeader} from 'app/search-page/components/SearchBuddyHeader'
import {Skill} from 'app/search-page/components/Skill'
import {SkillBox} from 'app/search-page/components/SkillBox'
import {StarButton} from 'app/search-page/components/StarButton'
import {useSession} from 'next-auth/client'
import {deleteStar, postStar} from 'app/search-page/api/starred'
import React, {useMemo} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {TBuddy, TStarred} from 'app/search-page/api/types'

export const GET_STARRED_KEY = 'starred'

export const SearchBuddy: React.FC<{buddy: TBuddy; starred: TStarred[]}> = ({buddy, starred}) => {
	const [session] = useSession()
	const queryClient = useQueryClient()

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
			<Center>{session && <StarButton isStarred={isStarred} onClick={onStarClick} />}</Center>
		</BuddyBox>
	)
}
