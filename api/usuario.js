const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Usuario, Resultado } = require('../models');

router.put('/edit/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, role } = req.body;

    try {
        const [atualizados] = await Usuario.update(
            { nome, email, senha, role },
            { where: { id } }
        );

        if (atualizados.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado ou sem alterações' });
        }

        // Busca o objeto atualizado diretamente do banco
        const usuarioAtualizado = await Usuario.findByPk(id);

        if (usuarioAtualizado.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado após atualização' });
        }

        res.status(200).json(usuarioAtualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
});

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (usuario.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
        console.log(error);
    }
});

router.get('/:id/resultados', authenticate, async (req, res) => {
    const { id } = req.params;
  
    try {
      const usuario = await Usuario.findByPk(id, {
        include: [{ model: Resultado, as: 'resultado' }]
      });
  
      if (!usuario) {
        return res.status(404).json({ error: 'Resultado não encontrado' });
      }
  
      if (!usuario.resultado || usuario.resultado.length === 0) {
        return res.status(404).json({ error: 'Resultado não encontrado para este usuário' });
      }
  
      res.json(usuario.resultado); // Retorna apenas o resultado relacionadas
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar resultado do usuário' });
    }
  });

  router.get('/', async (req, res) => {

     try {
        const usuarios = await Usuario.findAll();

        if (usuarios.length === 0) {
            return res.status(404).json({ error: 'Usuários não encontrados' });
        }

        res.json(usuarios);

        console.log('Usuário encontrado!');

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao buscar o usuários' });
    }

});

router.post('/register', async (req, res) => {
  const { nome, email, senha, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      role: role || 'usuario'
    });

    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {

    console.log(err)

    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

module.exports = router;
