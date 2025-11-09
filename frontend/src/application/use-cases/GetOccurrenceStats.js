export class GetOccurrenceStats {
  constructor(occurrenceRepository) {
    this.occurrenceRepository = occurrenceRepository;
  }

  async execute() {
    return await this.occurrenceRepository.getStats();
  }
}

