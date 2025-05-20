const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');



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
