module.exports = {
	name: 'status',
	description: 'Muda o status do bot',
	execute(msg, args, bot) {
		const tipoStatus = args.shift().toLowerCase()
		const conteudo = args.join(' ')

		msg.channel.send(mudarStatus(tipoStatus, conteudo))

		/**
		 * @param {String} tipo 
		 */
		function mudarStatus(tipo, conteudo) {
			
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
