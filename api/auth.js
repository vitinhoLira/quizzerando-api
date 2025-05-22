const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { secret, expiresIn } = require('../config/jwt');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, role: usuario.role }, secret, { expiresIn });
    const role = usuario.role;

    res.json({ token, role });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
