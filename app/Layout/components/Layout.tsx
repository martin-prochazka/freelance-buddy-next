import {Flex} from '@chakra-ui/react'
import {TopMenu} from 'app/layout/components/TopMenu'
import React from 'react'

export const Layout: React.FC = ({children}) => (
	<Flex flexDirection='column' height='full' justifyContent='center' marginX='5%'>
		<TopMenu />
		{children}
	</Flex>
)
