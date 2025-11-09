export class GetOccurrences {
  constructor(occurrenceRepository) {
    this.occurrenceRepository = occurrenceRepository;
  }

  async execute(filters = {}) {
    return await this.occurrenceRepository.getAll(filters);
  }
}

