export class UpdateOccurrenceStatus {
  constructor(occurrenceRepository) {
    this.occurrenceRepository = occurrenceRepository;
  }

  async execute(id, status) {
    return await this.occurrenceRepository.updateStatus(id, status);
  }
}
