import { OccurrenceRepository } from '../../domain/repositories/OccurrenceRepository';
import { Occurrence } from '../../domain/entities/Occurrence';

export class OccurrenceRepositoryImpl extends OccurrenceRepository {
  constructor(apiUrl) {
    super();
    this.apiUrl = apiUrl;
  }

  async getAll(filters = {}) {
    const params = new URLSearchParams();
    
    
    if (filters.status) {
      params.append('status', filters.status);
    }
    
    if (filters.prioridade) {
      params.append('prioridade', filters.prioridade);
    }
    
    if (filters.page) {
      params.append('page', filters.page);
    }
    
    if (filters.limit) {
      params.append('limit', filters.limit);
    }
    
    const url = `${this.apiUrl}/ocorrencias/filtrar?${params.toString()}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    
    return {
      occurrences: data.occurrences.map(item => new Occurrence({
        id: item._id,
        title: item.tipo,
        description: item.descricao,
        status: item.status,
        priority: item.prioridade,
        location: item.local,
        responsible: 'Não atribuído',
        date: new Date(item.data_reporte).toLocaleDateString('pt-BR'),
        imageUrl: item.evidencias?.[0] || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
      })),
      total: data.total,
      totalPages: data.totalPages || 1
    };
  }

  async getStats() {
    const response = await fetch(`${this.apiUrl}/ocorrencias/stats`);
    return await response.json();
  }
}

