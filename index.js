const fs = require('node:fs')
const { Client, Collection, Intents } = require('discord.js')
const { token, clientId } = require('./config.json')
const { greenBright } = require('chalk')

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })
bot.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	bot.commands.set(command.data.name, command)
}

bot.once('ready', () => {
	console.log(`Bot ${greenBright('Online!')}`)
})

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return

	const command = bot.commands.get(interaction.commandName)

	if (!command) return

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	}
});

bot.login(token)
