import {IconButton, Icon} from '@chakra-ui/react'
import React from 'react'
import {FaStar, FaRegStar} from 'react-icons/fa'

export const StarButton: React.FC<{
	isStarred: boolean
	onClick: () => void
}> = ({isStarred, onClick}) => (
	<IconButton
		aria-label='Star'
		variant='outline'
		icon={<Icon as={isStarred ? FaStar : FaRegStar} />}
		color='blue.500'
		borderColor='blue.500'
		size='xs'
		onClick={onClick}
	/>
)
