const { banco, contas } = require('../bancodedados');

const listarContasBancarias = (req, res) => {
    const senhaBanco = req.query.senha_banco;
    if (!senhaBanco) {
        return res.status(400).json({ mensagem: 'Senha do banco não informada' });
    }

    if (senhaBanco !== banco.senha) {
        return res.status(400).json({ mensagem: 'A senha do banco informada é inválida!' });
    } else {
        return res.status(200).json(contas);
    }

}

module.exports = listarContasBancarias;