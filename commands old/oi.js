module.exports = {
	name: 'oi',
	description: 'Responde: "E aí"',
	aliases: ['hi', 'hey', 'hello'],
	execute(msg) {
		msg.reply('E aí')
	}
}
