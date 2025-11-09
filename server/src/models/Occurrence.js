const mongoose = require('mongoose');

const occurrenceSchema = new mongoose.Schema({
  id_ocorrencia: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  local: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Pendente'
  },
  data_reporte: {
    type: Date,
    required: true,
    default: Date.now
  },
  data_atualizacao: {
    type: Date,
    required: true,
    default: Date.now
  },
  reporter_whatsapp_id: {
    type: String,
    required: true
  },
  evidencias: [{
    type: String
  }],
  prioridade: {
    type: String,
    required: true,
    default: 'Baixa'
  },
  contador_reports_similares: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Occurrence', occurrenceSchema);

