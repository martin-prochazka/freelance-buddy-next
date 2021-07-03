import {Button, Container, FormControl, FormLabel, Input, useToast} from '@chakra-ui/react'
import React, {useState} from 'react'
import {signIn} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

const login = (email: string, password: string) => {
	signIn('credentials', {
		username: email,
		password,
		callbackUrl: process.env.NEXT_PUBLIC_SERVER,
	})
}

const SignIn: React.FC<{csrfToken: string}> = () => {
	const {query} = useRouter()
	const toast = useToast()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const hasLoginFailed = Boolean(query.error)
	useEffect(() => {
		if (hasLoginFailed) {
			toast({
				title: 'Login has failed',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}, [hasLoginFailed])

	return (
		<Container>
			<FormControl id='email' isRequired>
				<FormLabel>Email</FormLabel>
				<Input placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
			</FormControl>
			<FormControl id='password' isRequired>
				<FormLabel>Password</FormLabel>
				<Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</FormControl>
			<Button onClick={() => login(email, password)}>Sign In</Button>
		</Container>
	)
}

export default SignIn
