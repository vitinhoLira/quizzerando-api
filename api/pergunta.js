const express = require('express');
const router = express.Router();
const { pergunta } = require('../models')

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pergunta = await pergunta.findByPk(id);

        if (!pergunta) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        res.json(pergunta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o pergunta' });
    }
});

router.get('/', async (req, res) => {

    const perguntas = await pergunta.findAll();
    res.json(perguntas)

});

router.post('/cad', async (req, res) => {

    const {enunciado, idQuiz, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta} = req.body;

    await pergunta.create({enunciado, idQuiz, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta});

    res.send('Pergunta cadastrada!')

});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const {enunciado, idQuiz, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta} = req.body; // ajuste conforme seus campos

    try {
        const [atualizados] = await pergunta.update(
            { enunciado, idQuiz, alternativa1, alternativa2, alternativa3, alternativa4, respCorreta }, // campos a atualizar
            { where: { id } }      // condição de qual registro
        );

        if (atualizados === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrado ou dados iguais' });
        }

        const perguntaAtualizada = await pergunta.findByPk(id);
        res.json(perguntaAtualizada);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a pergunta' });
    }
});

router.delete('/del/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletados = await pergunta.destroy({
            where: { id }
        });

        if (deletados === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        res.json({ message: 'Pergunta deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o pergunta' });
    }
});

module.exports = router