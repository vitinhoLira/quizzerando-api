const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const { Resultado } = require('../models')

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await Resultado.findByPk(id);

        if (resultado.length === 0) {
            return res.status(404).json({ error: 'Resultado não encontrado' });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o resultado' });
    }
});

router.get('/', authenticate, async (req, res) => {

     try {
        const resultados = await Resultado.findAll();

        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Resultados não encontrados' });
        }

        res.json(resultados);

        console.log('Resultado encontrado!');

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao buscar o resultados' });
    }

});

router.post('/cad', authenticate, async (req, res) => {

    const {pontuacao, quizzId, userId, acertos, erros} = req.body;

    try {
       const novoResultado = await Resultado.create({pontuacao, quizzId, userId, acertos, erros});

        res.status(201).json(novoResultado);

        console.log('Resultado cadastrado!');

    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar o resultado' });

        console.log(error);
    }


});

router.put('/edit/:id', authenticate, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;
    const {pontuacao, quizzId, acertos, erros} = req.body; // ajuste conforme seus campos

    try {
        const [atualizados] = await Pergunta.update(
            { pontuacao, quizzId, acertos, erros }, // campos a atualizar
            { where: { id } }      // condição de qual registro
        );

        if (atualizados.length === 0) {
            return res.status(404).json({ error: 'Resultado não encontrado ou dados iguais' });
        }

        const resultadoAtualizado = await Resultado.findByPk(id);
        res.status(200).json(resultadoAtualizado);

        console.log('Resultado atualizado!');

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a resultado' });
    }
});

router.delete('/del/:id', authenticate, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;

    try {
        const deletados = await Resultado.destroy({
            where: { id }
        });

        if (deletados.length === 0) {
            return res.status(404).json({ error: 'Resultado não encontrada' });
        }

        res.json({ message: 'Resultado deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o resultado' });
    }
});

module.exports = router