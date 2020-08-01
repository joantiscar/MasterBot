module.exports = {
	name: 'server',
	description: 'Información sobre el servidor y la cantidad de usuarios',
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
	},
}