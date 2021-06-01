import React from 'react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {Hydrate} from 'react-query/hydration'
import {ReactQueryDevtools} from 'react-query/devtools'
import {Provider as NextAuthProvider} from 'next-auth/client'

import type {AppProps} from 'next/app'

const theme = extendTheme({
	styles: {
		global: {
			body: {
				backgroundColor: 'gray.50',
			},
		},
	},
})

export default function App({Component, pageProps}: AppProps) {
	const queryClientRef = React.useRef<QueryClient>()
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient()
	}

	return (
		<NextAuthProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClientRef.current}>
					<Hydrate state={pageProps.dehydratedState}>
						<Component {...pageProps} />
					</Hydrate>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ChakraProvider>
		</NextAuthProvider>
	)
}
