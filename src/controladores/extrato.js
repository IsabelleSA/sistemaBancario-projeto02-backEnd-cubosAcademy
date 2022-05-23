const { contas, saques, depositos, transferencias } = require('../bancodedados');

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O numero da conta e a senha são obrigatórios!' });
    }

    const resultado = contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!resultado) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    if (resultado.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida' });
    }

    const depositar = depositos.filter(deposito => {
        return deposito.numero_conta === numero_conta;
    });

    const sacar = saques.filter(saque => {
        return saque.numero_conta === numero_conta;
    });

    const transferenciasEnviadas = transferencias.filter(transferencia => {
        return transferencia.numero_conta_origem === numero_conta;
    });

    const transferenciasRecebidas = transferencias.filter(transferencia => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    return res.status(200).json({ depositar, sacar, transferenciasEnviadas, transferenciasRecebidas });
}

module.exports = extrato;