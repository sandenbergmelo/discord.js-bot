module.exports = {
	name: 'roll',
	description: 'Rola dados',
	aliases: ['r', 'dice', 'rolldice'],
	execute(msg, args) {

		if (!args[0]) return msg.reply(gerarRolagem())

		const input = args.join(' ').split('d')
		const quantDados = input.shift()
		const dado = input.shift()

		if (dado == 0 || quantDados == 0) return

		if (dado.includes('+')) {
			const soma = Number(dado.split('+').pop())
			const dadoSemSoma = dado.split('+').shift()
			return msg.reply(gerarRolagem(quantDados, dadoSemSoma, soma))
		}
		else if (dado.includes('-')) {
			const soma = Number(dado.split('-').pop())
			const dadoSemSoma = dado.split('-').shift()
			return msg.reply(gerarRolagem(quantDados, dadoSemSoma, soma * (-1)))
		}

		msg.reply(gerarRolagem(quantDados, dado))

		/**
		 * @param {Number} dado 
		 * @param {Number} quantDados
		 * @param {Number} soma
		*/ 
		function gerarRolagem(quantDados = 1, dado = 20, soma = 0) {
			const rolls = []

			for (let i = 1; i <= quantDados; i++) {
				rolls.push(Math.floor(Math.random() * dado + 1))
			}
			
			const rolagens = rolls.map(function(valor) {
				if (valor == dado || valor == 1) {
					return `**${valor}**`
				}
				else {
					return valor
				}
			})

			const resultados = rolagens.join(', ')
			const total = rolls.reduce((total, numero) => total + numero, 0) + soma

			if (soma > 0) {
				return `\n${quantDados}d${dado} (${resultados}) + ${soma} ➜ \` ${total} \``
			}
			else if (soma < 0) {
				return `\n${quantDados}d${dado} (${resultados}) - ${soma * (-1)} ➜ \` ${total} \``
			}
			else {
				return `\n${quantDados}d${dado} (${resultados}) ➜ \` ${total} \``
			}
		}
	}
}
