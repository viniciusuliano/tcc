const mongoose = require('mongoose');

const administratorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha_hash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'Administrador'
  },
  data_criacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Administrator', administratorSchema);

