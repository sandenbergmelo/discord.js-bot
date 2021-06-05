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

	if(!bot.commands.has(command)) {
		msg.channel.send(`Não conheço o comando ${command}`)
		return
	}

	bot.commands.get(command).execute(msg, args, bot)
	
	if (command === 'help') {
		help(msg)
	}

})

function help(msg) {// Função que dispara ao digitar help
	msg.reply('Ajuda')
}

bot.login(token)
