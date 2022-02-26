const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('oi')
		.setDescription('Responde: "E aí"'),
	async execute(interaction) {
		await interaction.reply('E aí')
	},
}
