const game = require('../juego/GameManager')

module.exports = {
	name: 'game-status',
	description: 'Informacion del estado actual de la partida',
	cooldown: 5,
	usage: '[partidaId]',
	execute(message, partidaId) {
		if (game.partidas.length === 0) {
			message.channel.send('No hay partidas creadas!')
			return
		}
		let result = ''
		if (partidaId > 0) {
			result = game.partidas[partidaId - 1].resumen()
		}
		else{
			game.partidas.forEach((partida) => {
				result += partida.resumen() + '\n'
			})
		}
		message.channel.send(result)
	},
}