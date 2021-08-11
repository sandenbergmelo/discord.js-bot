module.exports = {
	name: 'criar',
	description: 'Cria um canal no servidor',
	execute(msg, args) {

		if (!args[0]) {
			const canal = criarCanal()
			return msg.channel.send(`Canal de ${canal.tipo} criado`)
		}

		const tipo = args.shift().toLowerCase()
		const nome = args.join(' ')

		const canal = criarCanal(tipo, nome)
		msg.channel.send(`Canal de ${canal.tipo} "${canal.nome}" criado`)

		function criarCanal(tipo = 'text', nome = 'canal de texto') {
			let tipoRetorno = ''

			if (tipo === 'text' || tipo === 'texto') {
				tipo = 'text'
				tipoRetorno = 'texto'
			}
			else if (tipo === 'voice' || tipo === 'voz' || tipo === 'call') {
				tipo = 'voice'
				tipoRetorno = 'voz'
			}
			else {
				nome = `${tipo} ${nome}`
				tipo = 'text'
				tipoRetorno = 'texto'
			}

			msg.guild.channels.create(nome, { type: tipo })

			return {
				nome: nome,
				tipo: tipoRetorno
			}
		}
	}
}
