const fs = require('fs')

module.exports = {
	partidas: [],
	cargarDatos() {
		this.partidas = JSON.parse(fs.readFileSync('saved-data.json'))
	},
	guardarDatos() {
		fs.writeFileSync('saved-data.json', JSON.stringify(this.partidas))
	},
}

