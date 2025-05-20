const express = require('express');

const quizz = require('./quizz');

const pergunta = require('./pergunta');

const resultado = require('./resultado');

const router = express.Router();

router.get('/', (req, res) => {

    res.send("Funcionando!");

});

router.use('/quizz', quizz );
router.use('/pergunta', pergunta );
router.use('/resultado', resultado );

module.exports= router;