import {Tag, Tooltip} from '@chakra-ui/react'
import React from 'react'

const MAX_SKILL_LENGHT = 20

export const Skill: React.FC<{skill: string}> = ({skill}) => (
	<Tag
		margin='1'
		size='md'
		borderRadius='full'
		variant='solid'
		backgroundColor='gray.400'
		color='gray.50'
		cursor='default'
	>
		{skill.length <= MAX_SKILL_LENGHT ? (
			<>{skill}</>
		) : (
			<Tooltip label={skill}>{`${skill.substr(0, MAX_SKILL_LENGHT - 1)}...`}</Tooltip>
		)}
	</Tag>
)
