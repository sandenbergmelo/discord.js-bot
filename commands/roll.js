module.exports = {
	name: 'roll',
	description: 'Rola dados',
	aliases: ['r'],
	execute(msg, args) {

		if (!args[0]) {
			msg.reply(gerarRolagem())
			return
		}

		const valores = args.join(' ').split('d')
		const quantDados = valores.shift()
		const dado = valores.shift()

		msg.reply(gerarRolagem(quantDados, dado))

		/**
		 * @param {Number} dado 
		 * @param {Number} quantDados
		*/ 
		function gerarRolagem(quantDados = 1, dado = 20) {
			const rolls = []

			for (let i = 0; i < quantDados; i++) {
				rolls.push(Math.floor(Math.random() * dado + 1))
			}
			
			const numeros = rolls.join(', ')
			const total = rolls.reduce((total, numero) => total + numero, 0)

			return `\n${quantDados}d${dado} (${numeros}) \u279C \` ${total} \``
		}
	}
}
