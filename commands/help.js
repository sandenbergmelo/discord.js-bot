module.exports = {
	name: 'help',
	description: 'Mostra os comandos do bot',
	aliases: ['ajuda', 'comandos', 'commands'],
	execute(msg, args) {
		const data = []
		const { commands } = msg.client

		if (!args.length) {
			data.push('Lista de comandos: ')
			data.push(commands.map(commands => commands.name).join(', '))

			return msg.author.send(data, { split: true })
				.then(() => {
					if (msg.channel.type === 'dm') return
					msg.reply('Eu mandei todos os comandos na sua DM!') 
				})
				.catch(err => {
					console.error(`Não foi possível enviar mensagem para ${msg.author.tag}.\n${err}`)
					msg.reply('Não consegui mandar os comandos na sua DM 😢')
				})
		}

		// TODO: Add informações para cada comando
	}
}
