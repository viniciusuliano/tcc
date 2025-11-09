const Occurrence = require('../models/Occurrence');
const occurrenceService = require('../services/occurrenceService');

exports.createOccurrence = async (req, res) => {
  try {
    const { descricao, local } = req.body;
    
    const similarOccurrence = await occurrenceService.findSimilarOccurrence(descricao, local);
    
    if (similarOccurrence) {
      similarOccurrence.contador_reports_similares += 1;
      similarOccurrence.prioridade = occurrenceService.prioritizeOccurrence({
        tipo: similarOccurrence.tipo,
        contador_reports_similares: similarOccurrence.contador_reports_similares
      });
      similarOccurrence.data_atualizacao = new Date();
      
      await similarOccurrence.save();
      
      return res.status(200).json({
        mensagem: 'Ocorrência similar encontrada e atualizada',
        occurrence: similarOccurrence
      });
    }
    
    const id_ocorrencia = await occurrenceService.generateNextOccurrenceId();
    
    const occurrence = new Occurrence({
      ...req.body,
      id_ocorrencia,
      prioridade: 'Baixa'
    });
    
    await occurrence.save();
    res.status(201).json(occurrence);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.listOccurrences = async (req, res) => {
  try {
    const occurrences = await Occurrence.find()
      .sort({ data_reporte: -1 });
    
    res.json({
      occurrences,
      total: occurrences.length
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.filterOccurrences = async (req, res) => {
  try {
    const { status, prioridade, page = 1, limit = 10 } = req.query;
        
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (prioridade && prioridade !== 'all') {
      query.prioridade = prioridade;
    }
    
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [occurrences, total] = await Promise.all([
      Occurrence.find(query).sort({ data_reporte: -1 }).skip(skip).limit(parseInt(limit)),
      Occurrence.countDocuments(query)
    ]);
    
    
    res.json({
      occurrences,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.getOccurrence = async (req, res) => {
  try {
    const occurrence = await Occurrence.findById(req.params.id);
    if (!occurrence) {
      return res.status(404).json({ erro: 'Ocorrência não encontrada' });
    }
    res.json(occurrence);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.updateOccurrence = async (req, res) => {
  try {
    const occurrence = await Occurrence.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        data_atualizacao: new Date()
      },
      { new: true }
    );
    
    if (!occurrence) {
      return res.status(404).json({ erro: 'Ocorrência não encontrada' });
    }
    
    res.json(occurrence);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total = await Occurrence.countDocuments();
    const pending = await Occurrence.countDocuments({ status: 'Pendente' });
    const inProgress = await Occurrence.countDocuments({ status: 'Em Andamento' });
    const completed = await Occurrence.countDocuments({ status: 'Concluída' });
    
    res.json({
      total,
      pending,
      inProgress,
      completed
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

