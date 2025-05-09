const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

const Quizz = require('./quizz');

const Pergunta = require('./pergunta');

const quizz = Quizz(sequelize, Sequelize.DataTypes);

const pergunta = Pergunta(sequelize, Sequelize.DataTypes);

const db = {

    quizz,
    pergunta,
    sequelize

}

module.exports = db;