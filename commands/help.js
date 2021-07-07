module.exports = {
	name: 'help',
	description: 'Mostra os comandos do bot',
	aliases: ['ajuda', 'comandos', 'commands'],
	execute(msg) {
		// TODO: colocar todos os comandos para mostrar no help
		msg.reply('Ajuda')
	}
}