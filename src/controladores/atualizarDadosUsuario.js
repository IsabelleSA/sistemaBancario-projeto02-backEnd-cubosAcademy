const { contas } = require('../bancodedados');

const atualizarDadosUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
    };

    if (parseInt(numeroConta) % 1 !== 0) {
        return res.status(400).json({ mensagem: "Número inválido" });
    }

    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: 'CPF inválido. Digite um CPF válido.' });
    };

    const usuario = contas.find((usuario) => {
        return usuario.numeroConta === Number(numeroConta);
    });

    if (!usuario) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    usuario.nome = nome;
    usuario.cpf = cpf;
    usuario.data_nascimento = data_nascimento;
    usuario.telefone = telefone;
    usuario.email = email;
    usuario.senha = senha;

    return res.status(203).send();

}


module.exports = atualizarDadosUsuario;





