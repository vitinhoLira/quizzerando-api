const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

const Quizz = require('./quizz');

const Pergunta = require('./pergunta');

const QuizzModel = Quizz(sequelize, Sequelize.DataTypes);

const PerguntaModel = Pergunta(sequelize, Sequelize.DataTypes);

const db = {

    Quizz: QuizzModel,
    Pergunta: PerguntaModel,
    sequelize

}

if (QuizzModel.associate) QuizzModel.associate(db);
if (PerguntaModel.associate) PerguntaModel.associate(db);

module.exports = db;