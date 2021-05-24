import {Avatar, Box, Center, Flex} from '@chakra-ui/react'
import React from 'react'

export const SearchBuddyHeader: React.FC<{avatar: string; role: string; name: string}> = ({avatar, name, role}) => (
	<Center>
		<Flex alignItems='center'>
			<Avatar src={avatar} marginRight='3' />
			<Box lineHeight='5' textAlign='center'>
				<Box fontSize='large' fontWeight='bold' color='cyan.800'>
					{role}
				</Box>
				<Box fontSize='medium' color='cyan.800'>
					{name}
				</Box>
			</Box>
		</Flex>
	</Center>
)
