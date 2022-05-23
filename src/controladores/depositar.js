const { contas, depositos } = require('../bancodedados');
const { format } = require('date-fns');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório" });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: "O valor a depositar é obrigatório" });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "Permitido valores apenas maiores que zero" });
    }

    const resultado = contas.find(conta => {
        return conta.numero === numero_conta;
    });
    if (!resultado) {
        return res.status(404).json({ mensagem: "Não existe conta associada a esse número" });
    }

    resultado.saldo += valor;

    const transacaoConcluida = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    };

    depositos.push(transacaoConcluida);
    return res.status(200).json(transacaoConcluida);

}

module.exports = depositar;