import {Box} from '@chakra-ui/react'
import React from 'react'

export const BuddyBox: React.FC = ({children}) => (
	<Box
		bgColor='gray.200'
		borderColor='gray.100'
		margin='5'
		width='350px'
		padding='3'
		paddingTop='5'
		borderRadius='5px'
		shadow='0px 4px 4px rgba(0, 0, 0, 0.15)'
	>
		{children}
	</Box>
)
