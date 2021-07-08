const Discord = require('discord.js')
const {prefix, token} = require('./config.json')
const fs = require('fs')

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
	let commandName = args.shift().toLowerCase()
	let command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	
	if (!command) {
		msg.channel.send(`Não conheço o comando ${commandName}`)
		return
	}

	try {
		command.execute(msg, args, bot)
	}
	catch(err) {
		msg.channel.send('Erro ao chamar comando(s)')
		console.error(`ERRO: ${err}`)
	}
})

bot.login(token)
