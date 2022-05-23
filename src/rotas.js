const express = require('express');
const listarContasBancarias = require('./controladores/listarcontasbancarias');
const criarcontabancaria = require('./controladores/criarcontabancaria');
const atualizarDadosUsuario = require("./controladores/atualizarDadosUsuario");
const excluirConta = require('./controladores/excluirconta');
const depositar = require('./controladores/depositar');
const sacar = require('./controladores/sacar');
const transferir = require('./controladores/transferir');
const consultarSaldo = require('./controladores/consultarSaldo');
const extrato = require('./controladores/extrato');


const rotas = express();

rotas.get('/contas', listarContasBancarias);
rotas.post('/contas', criarcontabancaria);
rotas.put("/contas/:numeroConta/usuario", atualizarDadosUsuario);
rotas.delete("/contas/:numeroConta", excluirConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', consultarSaldo);
rotas.get('/contas/extrato', extrato);

module.exports = rotas;
