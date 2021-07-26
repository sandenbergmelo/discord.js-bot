module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg) {
		msg.reply(`Ping...`).then(sent => {
			const latencia = sent.createdTimestamp - msg.createdTimestamp
			sent.edit(`Pong! Essa mensagem foi respondida em ${latencia}ms.`)
		})
	}
}
