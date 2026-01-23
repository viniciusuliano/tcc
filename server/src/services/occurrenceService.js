const Occurrence = require('../models/Occurrence');
const fuzz = require('fuzzball');

const OCCURRENCE_PREFIX = 'OC';
const ID_PADDING = 3;

const PRIORITY_THRESHOLDS = [
  { threshold: 4, level: 'Crítica' },
  { threshold: 2, level: 'Alta' },
  { threshold: 0, level: 'Média' }
];

const CRITICAL_TYPES = ['Estrutural', 'Elétrico', 'Segurança'];

exports.generateNextOccurrenceId = async () => {
  const lastOccurrence = await Occurrence.findOne().sort({ id_ocorrencia: -1 });
  
  if (!lastOccurrence) {
    return `${OCCURRENCE_PREFIX}-001`;
  }
  
  const lastNumber = parseInt(lastOccurrence.id_ocorrencia.split('-')[1]);
  const newNumber = lastNumber + 1;
  
  return `${OCCURRENCE_PREFIX}-${String(newNumber).padStart(ID_PADDING, '0')}`;
};

exports.findSimilarOccurrence = async (descricao, local, tipo) => {
  const occurrences = await Occurrence.find({
    status: { $ne: 'Concluída' },
    tipo: tipo
  });
  
  const DESCRIPTION_THRESHOLD = 70;
  const LOCATION_THRESHOLD = 80;
  
  for (const occurrence of occurrences) {
    const descSimilarity = fuzz.ratio(descricao.toLowerCase(), occurrence.descricao.toLowerCase());
    const localSimilarity = fuzz.ratio(local.toLowerCase(), occurrence.local.toLowerCase());
    
    if (descSimilarity > DESCRIPTION_THRESHOLD && localSimilarity > LOCATION_THRESHOLD) {
      return occurrence;
    }
  }
  
  return null;
};

exports.prioritizeOccurrence = (occurrence) => {
  const { contador_reports_similares, tipo } = occurrence;
  
  if (CRITICAL_TYPES.includes(tipo)) {
    if (contador_reports_similares >= 3) return 'Crítica';
    if (contador_reports_similares >= 1) return 'Alta';
  }
  
  const priority = PRIORITY_THRESHOLDS.find(p => contador_reports_similares > p.threshold);
  return priority ? priority.level : 'Baixa';
};

