const Discord = require('discord.js')
const {prefix, token} = require('./config.json')
const fs = require('fs')
const chalk = require('chalk')

const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

commandFiles.map(file => {
	const command = require(`./commands/${file}`)
	bot.commands.set(command.name, command)
})

bot.once('ready', () => {
	console.log(`Bot ${chalk.greenBright('Online!')}`)
	bot.user.setActivity('D&D 5e', {type: 'PLAYING'})
})

bot.on('message', msg => {
	if(!msg.content.startsWith(prefix) || msg.author.bot) return

	const args = msg.content.slice(prefix.length).trim().split(/ +/)
	const commandName = args.shift().toLowerCase()
	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	
	if (!command) return msg.channel.send(`Não conheço o comando ${commandName}`)

	try {
		command.execute(msg, args, bot)
	}
	catch(err) {
		console.error(`${chalk.redBright('Erro: ')} ${err}`)
		msg.channel.send('Erro ao chamar comando(s)')
	}
})

bot.login(token)
