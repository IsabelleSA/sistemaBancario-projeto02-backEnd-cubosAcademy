const { contas } = require('../bancodedados');
let identificador = 1;

const criarcontabancaria = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: 'CPF inválido. Digite um CPF válido.' });
    };
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    };

    const cpfValido = contas.find(conta => conta.usuario.cpf === cpf);
    const emailValido = contas.find(conta => conta.usuario.email === email);

    if (cpfValido || emailValido) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o CPF ou email informado" });
    };

    const usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };

    const conta = {
        numero: identificador.toString(),
        saldo: 0,
        usuario
    };

    contas.push(conta);
    identificador++;
    return res.status(201).json(conta);

}

module.exports = criarcontabancaria;