module.exports = {
	name: 'status',
	description: 'Muda o status do bot',
	execute(msg, args, bot) {
		const tipoStatus = args[0].toLowerCase()

		msg.channel.send(mudarStatus(tipoStatus))

		/**
		 * @param {String} tipo 
		 */
		function mudarStatus(tipo) {
			args.shift()
			const conteudo = args.join(' ')

			if (tipo === 'jogando') {
				bot.user.setActivity(conteudo, {type: 'PLAYING'})
				return `Agora eu estou jogando ${conteudo}`
			}
			else if (tipo === 'ouvindo') {
				bot.user.setActivity(conteudo, {type: 'LISTENING'})
				return `Agora eu estou ouvindo ${conteudo}`
			}
			else if (tipo === 'assistindo') {
				bot.user.setActivity(conteudo, {type: 'WATCHING'})
				return `Agora eu estou assistindo ${conteudo}`
			}
			else {
				return `Não conheço o tipo de status ${tipo}`
			}
		}
	}
}
