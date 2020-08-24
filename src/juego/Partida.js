class Partida {
	nombre = ''
    // TODO mapa = new Mapa()
    turno = 1
    dia = 1
    hora = 0
    minuto = 0
    jugadores = [] // TODO crear clase jugador

	constructor(nombre, turno = 1, dia = 1, hora = 0, minuto = 0, jugadores = []) {
		this.nombre = nombre
		this.turno = turno
		this.dia = dia
		this.hora = hora
		this.minuto = minuto
		this.jugadores = jugadores
	}

	deserialize(jstring) {
        let array = JSON.parse(jstring)
        let object = new this.types[array[0]]()
        array[1].map(e=>{object[e[0]] = e[1]})
        return object
    }

    jugadoresPendientes() {
		return this.jugadores.filter((jugador) => !jugador.haHechoTurno)
    }
    pasarTurno() {
		if (this.jugadoresPendientes.length > 0) {
			throw new Error('Jugadores pendientes')
		}
    }

    resumen() {
		let respuesta = 'Partida: ' + this.nombre + ':'
		respuesta += 'Turno: ' + this.turno
		respuesta += ' Dia: ' + this.dia
		respuesta += ' Hora: ' + this.hora
		respuesta += ' Minuto: ' + this.minuto
		return respuesta
    }
    /* let mensaje = 'No se ha podido avanzar el turno. Razón: \n'
    jugadoresPendientes.forEach((jugador) => mensaje += 'El jugador ' + jugador.nombre + ' aun no ha hecho su turno\n')*/
}


module.exports = Partida