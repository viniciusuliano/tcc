import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { Administrator } from '../../domain/entities/Administrator';

export class AuthRepositoryImpl extends AuthRepository {
  constructor(apiUrl) {
    super();
    this.apiUrl = apiUrl;
  }

  async login(email, senha) {
    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao fazer login');
    }

    const data = await response.json();

    return {
      token: data.token,
      administrator: new Administrator(data.administrator)
    };
  }
}

