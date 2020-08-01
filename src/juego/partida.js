class Partida {
    jugadores = [] // TODO crear clase jugador
    // TODO mapa = new Mapa()
    turno = 0
    dia = 0
    hora = 0
    minuto = 0

    jugadoresPendientes() {
        return this.jugadores.filter((jugador) => !jugador.haHechoTurno)
    }
    pasarTurno() {
    	if (this.jugadoresPendientes.length > 0) {
    	    throw new Error('Jugadores pendientes')
    	}
    }
    /* let mensaje = 'No se ha podido avanzar el turno. Razón: \n'
    jugadoresPendientes.forEach((jugador) => mensaje += 'El jugador ' + jugador.nombre + ' aun no ha hecho su turno\n')*/
}