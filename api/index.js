const express = require('express');

const quizz = require('./quizz');

const pergunta = require('./pergunta');

const router = express.Router();

router.get('/', (req, res) => {

    res.send("Funcionando!");

});

router.use('/quizz', quizz );
router.use('/pergunta', pergunta );

module.exports= router;