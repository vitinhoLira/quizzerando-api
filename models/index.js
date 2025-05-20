const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

const Quizz = require('./quizz');

const Pergunta = require('./pergunta');

const Resultado = require('./resultado');

const Usuario = require('./usuario');

const QuizzModel = Quizz(sequelize, Sequelize.DataTypes);

const PerguntaModel = Pergunta(sequelize, Sequelize.DataTypes);

const ResultadoModel = Resultado(sequelize, Sequelize.DataTypes);

const UsuarioModel = Resultado(sequelize, Sequelize.DataTypes);

const db = {

    Quizz: QuizzModel,
    Pergunta: PerguntaModel,
    Resultado: ResultadoModel,
    Usuario: UsuarioModel,
    sequelize

}

if (QuizzModel.associate) QuizzModel.associate(db);
if (PerguntaModel.associate) PerguntaModel.associate(db);
if (ResultadoModel.associate) ResultadoModel.associate(db);

module.exports = db;