let { contas } = require("../bancodedados");

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const contaEncontrada = contas.find(conta => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    if (contaEncontrada.saldo > 0) {
        return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for igual a zero!' });
    }

    const contaAExcluir = contas.indexOf(contaEncontrada);
    contas.splice(contaAExcluir, 1);
    return res.status(200).json({ mensagem: 'Conta excluída com sucesso!' });
}


module.exports = excluirConta;