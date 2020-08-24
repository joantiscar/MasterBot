const fs = require('fs')
const Partida = require('./Partida')

module.exports = {
	partidas: [],
	cargarDatos() {
		let data = JSON.parse(fs.readFileSync('saved-data.json'))
		if (data.partidas) {
			data.partidas.forEach(partida => {
				this.partidas.push(new Partida(partida.nombre, partida.turno, partida.dia, partida.hora, partida.minuto, partida.jugadores))
			})
		}
	},
	guardarDatos() {
		let data = {
			partidas: this.partidas,
		}
		fs.writeFileSync('saved-data.json', JSON.stringify(data))
	},
}

