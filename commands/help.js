const { prefix } = require('../config.json')

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
			data.push(`\nVocê pode enviar \`${prefix}help [nome do comando]\` para ter informações sobre um comando específico!`);

			return msg.author.send(data, { split: true })
				.then(() => {
					if (msg.channel.type === 'dm') return
					msg.reply('Eu mandei todos os comandos na sua DM!') 
				})
				.catch(err => {
					console.error(`Não foi possível enviar mensagem para ${msg.author.tag}.\n${err}`)
					msg.reply('\nNão consegui mandar os comandos na sua DM 😢, você desativou as mensagens diretas?')
				})
		}

		const name = args.shift()
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

		if (!command) return msg.reply('Não conheço esse comando')

		data.push(`**Nome: ** ${command.name}`)

		if (command.aliases) data.push(`**Aliases: ** ${command.aliases.join(', ')}`)
		if (command.description) data.push(`**Descrição: ** ${command.description}`)
		if (command.usage) data.push(`**Usage: ** ${prefix}${command.name} ${command.usage}`)

		msg.channel.send(data, { split: true })

	}
}
