export class Login {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email, senha) {
    return await this.authRepository.login(email, senha);
  }
}

