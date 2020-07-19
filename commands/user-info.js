module.exports = {
	name: 'user-info',
	description: 'Información del usuario que ejecuta este comando',
	execute(message, args) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
	},
}