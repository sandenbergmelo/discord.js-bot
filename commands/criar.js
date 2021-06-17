module.exports = {
	name: 'criar',
	description: 'Cria um canal no servidor',
	execute(msg, args) {
		let tipo = args.shift().toLowerCase()
		let nome = args.join(' ')
		let tipo2

		if (tipo === 'text' || tipo === 'texto') {
			tipo = 'text'
			tipo2 = 'texto'
		}
		else if (tipo === 'voice' || tipo === 'voz' || tipo === 'call') {
			tipo = 'voice'
			tipo2 = 'voz'
		}
		else {
			tipo = 'text'
			tipo2 = 'texto'
		}

		msg.guild.channels.create(nome, { type: tipo })
		msg.channel.send(`Canal de ${tipo2} "${nome}" criado`)
	}
}
