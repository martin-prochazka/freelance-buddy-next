import {GET_STARRED_KEY, SERVER_PATH} from 'app/search-page/api/constants'
import {StarredEntity, starredArraySchema} from 'app/search-page/api/types'
import axios from 'axios'
import {useSession} from 'next-auth/client'
import {useMutation, useQuery, useQueryClient} from 'react-query'

export const getStarred = async (): Promise<StarredEntity[]> => {
	const {data} = await axios.get(`${SERVER_PATH}/api/starred`)

	const starred = starredArraySchema.parse(data)

	return starred
}

export const postStar = async (buddyId: number) => {
	await axios.post('/api/starred', {buddyId})
}

export const deleteStar = async (id: number) => {
	await axios.delete(`/api/starred/${id}`)
}

export const useGetStarred = () => {
	const [session] = useSession()
	return session ? useQuery<StarredEntity[]>(GET_STARRED_KEY, getStarred) : {data: []}
}

export const useAddStar = () => {
	const queryClient = useQueryClient()

	const addStarMutation = useMutation(postStar, {
		onSuccess: () => {
			queryClient.invalidateQueries(GET_STARRED_KEY)
		},
	})

	return (id: number) => addStarMutation.mutate(id)
}

export const useRemoveStar = () => {
	const queryClient = useQueryClient()

	const deleteStarMutation = useMutation(deleteStar, {
		onSuccess: () => {
			queryClient.invalidateQueries(GET_STARRED_KEY)
		},
	})

	return (id: number) => deleteStarMutation.mutate(id)
}
