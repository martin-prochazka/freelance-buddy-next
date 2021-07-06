export const getNumber = (param: string | string[]): number | null => {
	if (Array.isArray(param)) {
		return null
	}

	const number = Number(param)

	if (Number.isNaN(number)) {
		return null
	}

	return number
}
