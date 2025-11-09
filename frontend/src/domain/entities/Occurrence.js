export class Occurrence {
  constructor({
    id,
    title,
    description,
    status,
    priority,
    location,
    responsible,
    date,
    imageUrl
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.location = location;
    this.responsible = responsible;
    this.date = date;
    this.imageUrl = imageUrl;
  }
}

