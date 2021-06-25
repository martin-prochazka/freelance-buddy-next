import {Flex, Text, Button} from '@chakra-ui/react'
import {signIn, signOut, useSession} from 'next-auth/client'
import React from 'react'

export const TopMenu: React.FC = () => {
	const [session] = useSession()

	return (
		<Flex flexDirection='row' marginBottom='5%' justifyContent='flex-end' alignItems='center'>
			{!session && (
				<Button onClick={() => signIn()} variant='link'>
					Sign in
				</Button>
			)}
			{session && (
				<>
					<Text fontSize='md' marginRight='2'>
						{session.user?.name}
					</Text>
					<Button onClick={() => signOut()} variant='link'>
						Sign out
					</Button>
				</>
			)}
		</Flex>
	)
}
