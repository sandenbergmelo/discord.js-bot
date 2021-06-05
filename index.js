const fs = require('fs')
const Discord = require('discord.js')
const {prefix, token} = require('./config.json')

const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (let file of commandFiles) {
	let command = require(`./commands/${file}`)
	bot.commands.set(command.name, command)
}

bot.once('ready', () => {
	console.log('Bot online')
	bot.user.setActivity('D&D 5e', {type: 'PLAYING'})
})

bot.on('message', msg => {
	if(!msg.content.startsWith(prefix) || msg.author.bot) return

	let args = msg.content.slice(prefix.length).trim().split(' ')
	let command = args.shift().toLowerCase()

	if(!bot.commands.has(command)) return

	bot.commands.get(command).execute(msg, args)
	
	if (command === 'help') {
		help(msg)
	}

	else if (command === 'status') {// Altera o status do bot
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

})

function help(msg) {// Função que dispara ao digitar help
	msg.reply('Ajuda')
}

bot.login(token)
