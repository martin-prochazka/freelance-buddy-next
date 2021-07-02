import {Flex} from '@chakra-ui/react'
import React from 'react'

export const SkillBox: React.FC = ({children}) => (
	<Flex marginY='5' justifyContent='center' flexWrap='wrap' marginX='10%'>
		{children}
	</Flex>
)
