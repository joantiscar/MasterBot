module.exports = {
	name: 'kick',
	description: 'Da una patada a alguien',
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('bro, no puedes pegar una patada a la nada, dime a quién pego')
		}
		// grab the "first" mentioned user from the message
		// this will return a `User` object, just like `message.author`
		const taggedUser = message.mentions.users.first()

		message.channel.send(`You wanted to kick: ${taggedUser.username}`)
	},
}