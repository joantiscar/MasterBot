const game = require('../juego/GameManager')
const Partida = require('../juego/Partida')

module.exports = {
	name: 'new-game',
	description: 'Crea una nueva partida',
	cooldown: 5,
	usage: '[nombre]',
	execute(message, nombre) {
		if (nombre) {
			game.partidas.push(new Partida(nombre))
		}
		else{
			game.partidas.push(new Partida('Partida ' + game.partidas.length))
		}
		message.channel.send('Partida creada correctamente')
	},
}