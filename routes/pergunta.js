const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const { Pergunta } = require('../models')

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const pergunta = await Pergunta.findByPk(id);

        if (pergunta.length === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        res.json(pergunta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o pergunta' });
    }
});

router.get('/', authenticate, async (req, res) => {

     try {
        const perguntas = await Pergunta.findAll();

        if (perguntas.length === 0) {
            return res.status(404).json({ error: 'perguntas não encontradas' });
        }

        res.json(perguntas);

        console.log('Pergunta encontrada!');

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao buscar o perguntas' });
    }

});

router.post('/cad', authenticate, authorizeRole('admin'), async (req, res) => {

    const {enunciado, quizzId, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta} = req.body;

    try {
       const novaPergunta = await Pergunta.create({enunciado, quizzId, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta});

        res.status(201).json(novaPergunta);

        console.log('Pergunta cadastrada!');

    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar o pergunta' });

        console.log(error);
    }


});

router.put('/edit/:id', authenticate, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;
    const {enunciado, idQuiz, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta} = req.body; // ajuste conforme seus campos

    try {
        const [atualizados] = await Pergunta.update(
            { enunciado, idQuiz, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta }, // campos a atualizar
            { where: { id } }      // condição de qual registro
        );

        if (atualizados.length === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrado ou dados iguais' });
        }

        const perguntaAtualizada = await Pergunta.findByPk(id);
        res.status(200).json(perguntaAtualizada);

        console.log('Pergunta atualizada!');

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a pergunta' });
    }
});

router.delete('/del/:id', authenticate, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;

    try {
        const deletados = await Pergunta.destroy({
            where: { id }
        });

        if (deletados.length === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        res.json({ message: 'Pergunta deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o pergunta' });
    }
});

module.exports = router