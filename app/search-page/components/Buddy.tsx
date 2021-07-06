import {Center} from '@chakra-ui/react'
import {BuddyBox} from 'app/search-page/components/BuddyBox'
import {BuddyHeader} from 'app/search-page/components/BuddyHeader'
import {Skill} from 'app/search-page/components/Skill'
import {SkillBox} from 'app/search-page/components/SkillBox'
import {StarButton} from 'app/search-page/components/StarButton'
import {useSession} from 'next-auth/client'
import {useAddStar, useRemoveStar} from 'app/search-page/api/starred'
import React, {useMemo} from 'react'
import {BuddyEntity, StarredEntity} from 'app/search-page/api/types'

export const Buddy: React.FC<{buddy: BuddyEntity; starred: StarredEntity[]}> = ({buddy, starred}) => {
	const [session] = useSession()

	const starredIds = useMemo(() => starred.map(({buddyId}) => buddyId), [starred])
	const isStarred = useMemo(() => starredIds.includes(buddy.id), [buddy.id, starredIds])

	const addStar = useAddStar()
	const deleteStar = useRemoveStar()

	const onStarClick = () => {
		if (!isStarred) {
			addStar(buddy.id)
		} else {
			const id = starred.find(({buddyId}) => buddyId === buddy.id)?.id
			id && deleteStar(id)
		}
	}

	return (
		<BuddyBox>
			<BuddyHeader avatar={buddy.user.avatar} name={buddy.user.name} role={buddy.role} />
			<SkillBox>
				{buddy.skills.map((skill, index) => (
					<Skill skill={skill} key={index} />
				))}
			</SkillBox>
			<Center>{session && <StarButton isStarred={isStarred} onClick={onStarClick} />}</Center>
		</BuddyBox>
	)
}
