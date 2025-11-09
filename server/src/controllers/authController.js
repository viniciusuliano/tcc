const Administrator = require('../models/Administrator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }
    
    const administrator = await Administrator.findOne({ email });
    
    if (!administrator) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    
    const senhaValida = await bcrypt.compare(senha, administrator.senha_hash);
    
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign(
      { 
        id: administrator._id, 
        email: administrator.email,
        role: administrator.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      administrator: {
        id: administrator._id,
        nome: administrator.nome,
        email: administrator.email,
        role: administrator.role
      }
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
