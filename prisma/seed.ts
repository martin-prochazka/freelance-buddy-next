import {PrismaClient} from '@prisma/client'
import {AvatarGenerator} from 'random-avatar-generator'
import faker from 'faker'
import _ from 'lodash'

const prisma = new PrismaClient()
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
				name: faker.name.findName(),
				email: faker.internet.email(),
				avatar: avatarGen.generateRandomAvatar(),
			},
			role: role.roleName,
			skills: getSkills(role.skills),
		}
	})
}

function getSkills(roleSkills: string[]) {
	const almostRandomSkills = _.times(
		faker.datatype.number({min: 3, max: roleSkills.length - 1}),
		() => roleSkills[faker.datatype.number(roleSkills.length - 1)]
	)

	return _.uniq(almostRandomSkills)
}

async function main() {
	await prisma.user.deleteMany()
	await prisma.skill.deleteMany()
	await prisma.buddy.deleteMany()

	const buddies = getBuddies()

	for (const buddy of buddies) {
		await prisma.buddy.create({
			data: {
				role: buddy.role,
				user: {create: buddy.user},
				skills: {create: buddy.skills.map((skill) => ({name: skill}))},
			},
		})
	}
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
