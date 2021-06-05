module.exports = {
	name: 'status',
	description: 'Muda o status do bot',
	execute(msg, args, bot) {
		let tipoStatus = args[0].toLowerCase()
		
		if (tipoStatus === 'jogando') {
			args.shift()
			let jogo = args.join(' ')
			bot.user.setActivity(jogo, {type: 'PLAYING'})
			msg.channel.send(`Agora eu estou jogando ${jogo}`)
		}
		else if (tipoStatus === 'ouvindo') {
			args.shift()
			let musica = args.join(' ')
			bot.user.setActivity(musica, {type: 'LISTENING'})
			msg.channel.send(`Agora eu estou ouvindo ${musica}`)
		}
		else if (tipoStatus === 'assistindo') {
			args.shift()
			let video = args.join(' ')
			bot.user.setActivity(video, {type: 'WATCHING'})
			msg.channel.send(`Agora eu estou assistindo ${video}`)
		}
		else {
			msg.channel.send(`Não conheço o tipo de status ${tipoStatus}`)
		}
	}
}