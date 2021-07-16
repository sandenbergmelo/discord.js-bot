module.exports = {
	name: 'roll',
	description: 'Rola dados',
	aliases: ['r'],
	execute(msg, args) {

		if (!args[0]) {
			msg.reply(gerarRolagem())
			return
		}

		let valores = args.join(' ').split('d')
		let quantDados = valores.shift()
		let dado = valores.shift()

		msg.reply(gerarRolagem(quantDados, dado))

		/**
		 * @param {Number} dado 
		 * @param {Number} quantDados
		*/ 
		function gerarRolagem(quantDados = 1, dado = 20) {
			let roll = 0
			let total = 0
			let numbers = ''

			for (let i = 0; i < quantDados; i++) {
				roll = Math.floor(Math.random() * dado + 1)
				total += roll
				
				if (numbers == '') {
					numbers += `${roll}`
				}
				else {
					numbers += `, ${roll}`
				}
			}

			return `${quantDados}d${dado} (${numbers}) \u279C \` ${total} \``
		}
	}
}
