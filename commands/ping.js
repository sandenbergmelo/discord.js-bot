module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args) {
		let latencia = Date.now() - msg.createdTimestamp
		msg.reply(`Pong! Essa mensagem foi respondida em ${latencia}ms.`)
	}
}