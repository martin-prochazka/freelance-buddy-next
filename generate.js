module.exports = function () {
	const faker = require('faker')
	const _ = require('lodash')

	const USERS_COUNT = 105

	function getStarred() {
		return _.uniq(
			_.times(10, (id) => ({
				id,
				buddyId: faker.datatype.number(USERS_COUNT),
			}))
		)
	}

	return {
		starred: getStarred(),
	}
}
