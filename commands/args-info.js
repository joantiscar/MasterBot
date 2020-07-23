module.exports = {
	name: 'args-info',
	description: '(dev) Información sobre los argumentos',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar')
		}

		message.channel.send(`Primer argumento: ${args[0]}`)
	},
}