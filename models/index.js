const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

const Quizz = require('./quizz');

const quizz = Quizz(sequelize, Sequelize.DataTypes);

const db = {

    quizz,
    sequelize

}

module.exports = db;