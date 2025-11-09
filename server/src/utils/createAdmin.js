require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Administrator = require('../models/Administrator');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');

    const nome = process.argv[2] || 'Admin';
    const email = process.argv[3] || 'admin@example.com';
    const senha = process.argv[4] || 'admin123';

    const existingAdmin = await Administrator.findOne({ email });
    if (existingAdmin) {
      console.log('Email já cadastrado!');
      process.exit(1);
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const admin = new Administrator({
      nome,
      email,
      senha_hash,
      role: 'Administrador'
    });

    await admin.save();


    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar administrador:', error);
    process.exit(1);
  }
};

createAdmin();

