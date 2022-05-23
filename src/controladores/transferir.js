const { contas, transferencias } = require('../bancodedados');
const { format } = require('date-fns');

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Só é permitido valores maior que zero!' });
    }

    const resultadoOrigem = contas.find(conta => {
        return conta.numero === numero_conta_origem;
    });

    if (!resultadoOrigem) {
        return res.status(404).json({ mensagem: 'Conta de origem inexistente!' });
    }

    const resultadoDestino = contas.find(conta => {
        return conta.numero === numero_conta_destino;
    });

    if (!resultadoDestino) {
        return res.status(404).json({ mensagem: 'Conta de destino inexistente!' });
    }

    if (resultadoOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida! Digite a senha correta!' });
    }

    if (resultadoOrigem.saldo < valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente!' });
    }

    resultadoOrigem.saldo -= valor;
    resultadoDestino.saldo += valor;

    const transacaoConcluida = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    transferencias.push(transacaoConcluida);
    return res.status(200).json(transacaoConcluida);

}


module.exports = transferir;