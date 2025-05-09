const express = require('express');
const router = express.Router();
const { quizz, pergunta } = require('../models')

router.get('/:id/perguntas', async (req, res) => {
  const { id } = req.params;

  try {
    const quizz = await quizz.findByPk(id, {
      include: [{ model: Pergunta, as: 'perguntas' }]
    });

    if (!quizz) {
      return res.status(404).json({ error: 'Quizz não encontrado' });
    }

    res.json(quizz.perguntas); // Só retorna as perguntas
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar perguntas do quizz' });

    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const quizz = await quizz.findByPk(id);

        if (!quizz) {
            return res.status(404).json({ error: 'Quizz não encontrado' });
        }

        res.json(quizz);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o quizz' });
    }
});

router.get('/', async (req, res) => {

    try {

        const quizzes = await quizz.findAll();

        if (!quizzes) {
            return res.status(404).json({ error: 'Quizzes não encontrados' });
        }

        res.json(quizzes);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar todos os quizzes' });
    }

});

router.post('/cad', async (req, res) => {

    const {titulo, descricao, categoria, idUsuario, ativo} = req.body;

    try {

        await quizz.create({titulo, descricao, categoria, idUsuario, ativo});

        res.json(quizz);

        console.log('Quizz cadastrado!')

    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar quizz' });
    }

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
            return res.status(404).json({ error: 'Quizz não encontrado ou dados iguais' });
        }

        const quizAtualizado = await quizz.findByPk(id);
        res.json(quizAtualizado);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o quizz' });
    }
});

router.delete('/del/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletados = await quizz.destroy({
            where: { id }
        });

        if (deletados === 0) {
            return res.status(404).json({ error: 'Quizz não encontrado' });
        }

        res.json({ message: 'Quizz deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o quizz' });
    }
});

module.exports = router