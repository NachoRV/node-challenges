export default class TodoService {
  constructor ({ todoRepository }) {
    this.todoRepository = todoRepository
  }

  find () {
    return this.todoRepository.find()
  }

  findOne (id) {
    return this.todoRepository.findOne(id)
  }

  async create (data) {
    return await this.todoRepository.create(data)
  }

  async update (data) {
    return await this.todoRepository.update(data)
  }

  async delete (data) {
    return await this.todoRepository.delete(data)
  }
}
