const Occurrence = require('../models/Occurrence');
const fuzz = require('fuzzball');

exports.generateNextOccurrenceId = async () => {
  const lastOccurrence = await Occurrence.findOne().sort({ id_ocorrencia: -1 });
  
  if (!lastOccurrence) {
    return 'OC-001';
  }
  
  const lastNumber = parseInt(lastOccurrence.id_ocorrencia.split('-')[1]);
  const newNumber = lastNumber + 1;
  
  return `OC-${String(newNumber).padStart(3, '0')}`;
};

exports.findSimilarOccurrence = async (descricao, local) => {
  const occurrences = await Occurrence.find({
    status: { $ne: 'Concluída' }
  });
  
  for (const occurrence of occurrences) {
    const descSimilarity = fuzz.ratio(descricao.toLowerCase(), occurrence.descricao.toLowerCase());
    const localSimilarity = fuzz.ratio(local.toLowerCase(), occurrence.local.toLowerCase());
    
    console.log('Comparando:');
    console.log('  Nova:', descricao, '|', local);
    console.log('  Existente:', occurrence.descricao, '|', occurrence.local);
    console.log('  Similaridade desc:', descSimilarity, '| local:', localSimilarity);
    
    if (descSimilarity > 85 && localSimilarity > 90) {
      return occurrence;
    }
  }
  
  return null;
};

exports.prioritizeOccurrence = (occurrence) => {
  const { contador_reports_similares } = occurrence;
  
  const priorities = [
    { threshold: 5, level: 'Crítica' },
    { threshold: 3, level: 'Alta' },
    { threshold: 1, level: 'Média' }
  ];
  
  const priority = priorities.find(p => contador_reports_similares > p.threshold);
  return priority ? priority.level : 'Baixa';
};

