module.exports = function () {
	const faker = require('faker')
	const _ = require('lodash')
	const {AvatarGenerator} = require('random-avatar-generator')

	const avatarGen = new AvatarGenerator()

	const USERS_COUNT = 105
	const ROLES_WITH_SKILLS = [
		{
			roleName: 'Frontend Developer',
			skills: [
				'React',
				'TypeScript',
				'Redux',
				'Styled Components',
				'React Query',
				'Redux Toolkit',
				'Redux Saga',
				'CSS',
			],
		},
		{
			roleName: 'Backend Developer',
			skills: ['C#', '.Net Core', 'Postgres', 'Linq', 'Java', 'Kotlin', 'MSSQL', 'MySQL', 'PHP'],
		},
		{
			roleName: 'UX Designer',
			skills: ['Figma', 'Wireframes', 'Proto.io', 'Sketch', 'Adobe XD', 'Research', 'Photoshop'],
		},
	]

	function getBuddies() {
		return _.times(USERS_COUNT, (id) => {
			const role = ROLES_WITH_SKILLS[faker.datatype.number(ROLES_WITH_SKILLS.length - 1)]

			return {
				id,
				user: {
					id,
					name: faker.name.findName(),
					email: faker.internet.email(),
					avatar: avatarGen.generateRandomAvatar(),
				},
				role: role.roleName,
				skills: getSkills(role.skills),
			}
		})
	}

	function getSkills(roleSkills) {
		const almostRandomSkills = _.times(
			faker.datatype.number({min: 3, max: roleSkills.length - 1}),
			() => roleSkills[faker.datatype.number(roleSkills.length - 1)]
		)

		return _.uniq(almostRandomSkills)
	}

	function getStarred() {
		return _.uniq(
			_.times(10, (id) => ({
				id,
				buddyId: faker.datatype.number(USERS_COUNT),
			}))
		)
	}

	return {
		buddies: getBuddies(),
		starred: getStarred(),
	}
}
