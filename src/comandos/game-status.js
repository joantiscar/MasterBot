const game = require('../juego/GameManager')

module.exports = {
	name: 'game-status',
	description: 'Informacion del estado actual de la partida',
	cooldown: 5,
	usage: '[partidaId]',
	execute(message, partidaId) {
		let result = ''
		if (partidaId > 0) {
			result = game.partidas[partidaId - 1].name + ', veces consultado: ' + game.partidas[partidaId - 1].timesConsulted
			game.partidas[partidaId - 1].timesConsulted++
		}
		else{
			game.partidas.forEach((partida) => {
				result += partida.name + ', veces consultado: ' + partida.timesConsulted + '\n'
				partida.timesConsulted++
			})
		}
		message.channel.send(result)
	},
}