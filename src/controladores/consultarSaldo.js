const { contas } = require('../bancodedados');

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "Parâmetros obrigatórios, favor digitar!" });
    }

    const resultado = contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!resultado) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (resultado.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    return res.status(200).json({ saldo: resultado.saldo });
}

module.exports = consultarSaldo;
