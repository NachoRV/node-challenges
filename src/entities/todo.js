import { randomUUID } from 'node:crypto'

export default class Todo {
  constructor ({ description, status, important }) {
    this.id = randomUUID()
    this.description = description
    this.status = status
    this.important = important
  }
}
