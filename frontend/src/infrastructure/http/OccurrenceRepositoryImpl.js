import { OccurrenceRepository } from '../../domain/repositories/OccurrenceRepository';
import { Occurrence } from '../../domain/entities/Occurrence';

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop';

export class OccurrenceRepositoryImpl extends OccurrenceRepository {
  constructor(apiUrl) {
    super();
    this.apiUrl = apiUrl;
  }

  async getAll(filters = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    
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
        imageUrl: item.evidencias?.[0] || DEFAULT_IMAGE_URL
      })),
      total: data.total,
      totalPages: data.totalPages || 1
    };
  }

  async getStats() {
    const response = await fetch(`${this.apiUrl}/ocorrencias/stats`);
    return await response.json();
  }

  async updateStatus(id, status) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.apiUrl}/ocorrencias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar status da ocorrência');
    }

    return await response.json();
  }
}

