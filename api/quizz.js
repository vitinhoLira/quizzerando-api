const express = require('express');
const router = express.Router();
const { quizz } = require('../models')

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const quizz = await quizz.findByPk(id);

        if (!quizz) {
            return res.status(404).json({ error: 'Quiz não encontrado' });
        }

        res.json(quizz);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o quiz' });
    }
});

router.get('/', async (req, res) => {

    const quizzes = await quizz.findAll();
    res.json(quizzes)

});

router.post('/cad', async (req, res) => {

    const {titulo, descricao, categoria, idUsuario, ativo} = req.body;

    await quizz.create({titulo, descricao, categoria, idUsuario, ativo});

    res.send('quizz cadastrado!')

});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const {titulo, descricao, categoria, idUsuario, ativo} = req.body; // ajuste conforme seus campos

    try {
        const [atualizados] = await quizz.update(
            { titulo, descricao, categoria, idUsuario, ativo }, // campos a atualizar
            { where: { id } }      // condição de qual registro
        );

        if (atualizados === 0) {
            return res.status(404).json({ error: 'Quiz não encontrado ou dados iguais' });
        }

        const quizAtualizado = await quizz.findByPk(id);
        res.json(quizAtualizado);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o quiz' });
    }
});

router.delete('/del/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletados = await quizz.destroy({
            where: { id }
        });

        if (deletados === 0) {
            return res.status(404).json({ error: 'Quiz não encontrado' });
        }

        res.json({ message: 'Quiz deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o quiz' });
    }
});

module.exports = router