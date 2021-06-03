const Discord = require('discord.js')
const bot = new Discord.Client()
const {prefix, token} = require('./config.json')
bot.login(token)

bot.on('ready', () => {
	console.log('Bot online')
	bot.user.setActivity('COD Mobile', {type: 'PLAYING'})
})

bot.on('message', msg => {
	if(msg.author.bot) return
	if(!msg.content.startsWith(prefix)) return

	let commandBody = msg.content.slice(prefix.length)
	let args = commandBody.split(' ')
	let command = args.shift().toLowerCase()
	
	if (command === 'help') {
		help(msg)
	}
	
	else if (command === 'ping') {// Mostra o latência da mensagem
		let latencia = Date.now() - msg.createdTimestamp
		msg.reply(`Pong! Essa mensagem foi respondida em ${latencia}ms.`)
	}
	
	else if (command === 'oi' || command === 'hey') {// Responde 'E aí'
		msg.reply('E aí')
	}

	else if (command === 'jogando') {// Altera o status de jogo do bot
		let jogo = args.join(' ')
		bot.user.setActivity(jogo, {type: 'PLAYING'})
		msg.reply(`Agora eu estou jogando ${jogo}`)
	}

	else {// Comando errado
		msg.reply(`Não conheço o comando ${command}`)
	}

})

function help(msg) {// Função que dispara ao digitar help
	msg.reply('Ajuda')
}
