require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // para gerar senha aleatória
const { Usuario } = require('../models');
const { secret, expiresIn } = require('../config/jwt');

const router = express.Router();

router.post('/recovery', async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      // Para evitar que alguém saiba se o email existe
      return res.status(200).json({ message: 'Se o email existir, uma nova senha será enviada.' });
    }

    // Gera nova senha temporária
    const novaSenha = crypto.randomBytes(6).toString('hex'); // Ex: "a1b2c3d4e5f6"
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

    // Atualiza senha no banco
    usuario.senha = senhaCriptografada;
    await usuario.save();

    // Configura o transporte de email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou SMTP personalizado
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWD,
      },
    });

    // Envia o email com a nova senha
    await transporter.sendMail({
      from: 'Quizzerando',
      to: usuario.email,
      subject: 'Nova senha de acesso',
      html: `<p>Olá,</p>
             <p>Você solicitou uma nova senha. Aqui está sua nova senha temporária:</p>
             <p><strong>${novaSenha}</strong></p>
             <p>Use essa senha para fazer login e altere-a no painel da plataforma.</p>`,
    });

    res.json({ message: 'Se o email existir, uma nova senha foi enviada.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar nova senha' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, role: usuario.role }, secret, { expiresIn });
    const role = usuario.role;
    const id = usuario.id;

    res.json({ token, role, id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
