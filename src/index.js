const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
const client = new Discord.Client()
const cooldowns = new Discord.Collection()
client.commands = new Discord.Collection()

// Guardamos los nombres de todos los archivos de la carpeta comandos que terminan en js
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'))

// Por cada uno de los archivos, lo importamos y en el array "commands" lo guardamos junto con el nombre del comando
for (const file of commandFiles) {
    const command = require(`./comandos/${file}`)
    client.commands.set(command.name, command)
}


// Cuando el cliente ha iniciado sesion, salta este console.log
client.once('ready', () => {
    console.log('Ready!')
})

// Acciones que hacemos cuando llega un mensaje
client.on('message', message => {
        // Si el mensaje no empieza con el prefijo, no hacemos nada
        if (!message.content.startsWith(prefix) || message.author.bot) return

        // Dividimos el mensaje en argumentos
        const args = message.content.slice(prefix.length).trim().split(/ +/)
            // Guardamos el primero de los argumentos (el nombre del comando) y lo eliminamos de la lista de argumentos
        const commandName = args.shift().toLowerCase()

        // Guardamos el comando que se llama como el que nos passan en el mensaje
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        // Si no encontramos el comando, terminamos la funcion
        if (!command) return


        // Si el comando solo se puede usar en un servidor, mostramos un error
        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!')
        }

        // Si no hay argumentos extra, pero el comando los requiere, mostramos un error
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`
                // Si el comando especifica los argumentos que le hacen falta, los mostramos
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
            }
            return message.channel.send(reply)
        }
        // Si el comando no esta en el array de cooldowns, lo ponemos
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection())
        }
        // Guardamos la hora actual
        const now = Date.now()
            // Guardamos el momento en el que se metio el comando en cooldown
        const timestamps = cooldowns.get(command.name)
            // Calculamos el tiempo de cooldown del comando. Si no tiene, esta operacion da 0
        const cooldownAmount = (command.cooldown || 3) * 1000
            // Si el autor del mensaje esta en la lista de timestamps del comando, entramos en el if
        if (timestamps.has(message.author.id)) {
            // Calculamos el momento en el que el autor del mensaje deberia poder usar el comando de nuevo
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount
                // Si aun no ha pasado suficiente tiempo, informamos al usuario
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
            }
        }
        // En caso contrario, lo metemos, y programamos que se le borre cuando pase el tiempo de cooldown
        else {
            timestamps.set(message.author.id, now)
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
        }
        // Intentamos ejecutar el comando
        try {
            command.execute(message, args)
        } catch (error) {
            // Si hay algun error al ejecutar el comando, lo mostramos por la consola del bot y mandamos un mensaje para informar
            console.error(error)
            message.reply('there was an error trying to execute that command!')
        }


    })
    // iniciamos sesion a discord con el token
client.login(token)