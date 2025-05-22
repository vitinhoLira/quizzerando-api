const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const { Quizz, Pergunta, Resultado } = require('../models');

router.get('/:id/resultado', authenticate, async (req, res) => {
    const { id } = req.params;
  
    try {
      const quizz = await Quizz.findByPk(id, {
        include: [{ model: Resultado, as: 'resultado' }]
      });
  
      if (!quizz) {
        return res.status(404).json({ error: 'Resultado não encontrado' });
      }
  
      if (!quizz.resultado || quizz.resultado.length === 0) {
        return res.status(404).json({ error: 'Resultado não encontrado para este quizz' });
      }
  
      res.json(quizz.resultado); // Retorna apenas o resultado relacionadas
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar resultado do quizz' });
    }
  });

router.get('/:id/perguntas', authenticate, async (req, res) => {
    const { id } = req.params;
  
    try {
      const quizz = await Quizz.findByPk(id, {
        include: [{ model: Pergunta, as: 'perguntas' }]
      });
  
      if (!quizz) {
        return res.status(404).json({ error: 'Quizz não encontrado' });
      }
  
      if (!quizz.perguntas || quizz.perguntas.length === 0) {
        return res.status(404).json({ error: 'Perguntas não encontradas para este quizz' });
      }
  
      res.json(quizz.perguntas); // Retorna apenas as perguntas relacionadas
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar perguntas do quizz' });
    }
  });
  
  

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const quizz = await Quizz.findByPk(id);

        if (quizz.length === 0) {
            return res.status(404).json({ error: 'Quizz não encontrado' });
        }

        res.json(quizz);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o quizz' });
        console.log(error);
    }
});

router.get('/', authenticate, async (req, res) => {

    try {

        const quizzes = await Quizz.findAll();

        if (quizzes.length === 0) {
            return res.status(404).json({ error: 'Quizzes não encontrados' });
        }

        res.json(quizzes);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar todos os quizzes' });
        console.log(error);
    }

});

router.post('/cad', authenticate, authorizeRole('admin'), async (req, res) => {
  
    const { titulo, descricao, categoria, idUsuario, ativo } = req.body;

    try {
        const novoQuizz = await Quizz.create({ titulo, descricao, categoria, idUsuario, ativo });

        res.status(201).json(novoQuizz); // retorna o objeto criado com status 201 (Created)

        console.log('Quizz cadastrado!');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar quizz' });
        console.log(error);
    }
});

router.put('/edit/:id', authenticate, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, categoria, idUsuario, ativo } = req.body;

    try {
        const [atualizados] = await Quizz.update(
            { titulo, descricao, categoria, idUsuario, ativo },
            { where: { id } }
        );

        if (atualizados.length === 0) {
            return res.status(404).json({ error: 'Quizz não encontrado ou sem alterações' });
        }

        // Busca o objeto atualizado diretamente do banco
        const quizzAtualizado = await Quizz.findByPk(id);

        if (quizzAtualizado.length === 0) {
            return res.status(404).json({ error: 'Quizz não encontrado após atualização' });
        }

        res.status(200).json(quizzAtualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o quizz' });
    }
});


router.delete('/del/:id', authenticate, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;

    try {
        const deletados = await Quizz.destroy({
            where: { id }
        });

        if (deletados.length === 0) {
            return res.status(404).json({ error: 'Quizz não encontrado' });
        }

        res.json({ message: 'Quizz deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o quizz' });
    }
});

module.exports = router