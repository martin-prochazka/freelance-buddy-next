module.exports = {
	async rewrites() {
		return [
			{
				source: '/api-json/:slug*',
				destination: `http://localhost:5000/:slug*`,
			},
		]
	},
}
