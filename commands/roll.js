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
			let roll = 0
			let total = 0
			const valores = []

			for (let i = 0; i < quantDados; i++) {
				roll = Math.floor(Math.random() * dado + 1)
				total += roll
				
				valores.push(roll)
			}
			const numbers = valores.join(', ')

			return `\n${quantDados}d${dado} (${numbers}) \u279C \` ${total} \``
		}
	}
}
