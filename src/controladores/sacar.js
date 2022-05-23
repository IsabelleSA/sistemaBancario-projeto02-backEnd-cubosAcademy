const { contas, saques } = require('../bancodedados');
const { format } = require('date-fns');

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "Todos devem ser preenchidos" });
    }

    const resultado = contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!resultado) {
        return res.status(404).json({ mensagem: "Não existe conta associada a esse número" });
    }

    if (resultado.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta. Digite novamente!" });
    }

    if (resultado.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente" });
    }

    resultado.saldo -= valor;

    const transacaoConcluida = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    };

    saques.push(transacaoConcluida);
    return res.status(200).json(transacaoConcluida);
}

module.exports = sacar;