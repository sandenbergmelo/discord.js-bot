module.exports = {
	name: 'criar',
	description: 'Cria um canal no servidor',
	execute(msg, args) {

		if (!args[0]) {
			return msg.channel.send(`Canal de ${criarCanal()} criado`)
		}

		const tipo = args.shift().toLowerCase()
		const nome = args.join(' ')

		msg.channel.send(`Canal de ${criarCanal(tipo, nome)} "${nome}" criado`)

		function criarCanal(tipo = 'text', nome = 'canal de texto') {
			let retorno = ''

			if (tipo === 'text' || tipo === 'texto') {
				tipo = 'text'
				retorno = 'texto'
			}
			else if (tipo === 'voice' || tipo === 'voz' || tipo === 'call') {
				tipo = 'voice'
				retorno = 'voz'
			}
			else {
				tipo = 'text'
				retorno = 'texto'
			}
			
			msg.guild.channels.create(nome, { type: tipo })
			return retorno
		}
	}
}
