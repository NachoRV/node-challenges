import { readFile, writeFile } from 'node:fs/promises'

export default class TodoRepository {
  constructor ({ filePath }) {
    this.file = filePath
  }

  async #currentFileContent () {
    return JSON.parse(
      await readFile(this.file)
    )
  }

  find () {
    return this.#currentFileContent()
  }

  async findOne (id) {
    const data = await this.#currentFileContent()
    return data.filter(todo => todo.id === id)[0]
  }

  async create (data) {
    const currentFileData = await this.#currentFileContent()
    currentFileData.push(data)
    await writeFile(this.file, JSON.stringify(currentFileData))
    return data.id
  }

  async update (data) {
    const currentFileData = await this.#currentFileContent()
    const index = currentFileData.findIndex(todo => todo.id === data.id)
    currentFileData[index] = data
    console.log(currentFileData[index])
    await writeFile(this.file, JSON.stringify(currentFileData))
    return data.id
  }

  async delete (id) {
    const currentFileData = await this.#currentFileContent()
    const newCurrentFileData = currentFileData.filter(todo => todo.id !== id)
    await writeFile(this.file, JSON.stringify(newCurrentFileData))
    return id
  }
}

// test

// const todoRep = new TodoRepository({
//  file: './src/database/data.json'
// })

// console.log(
//  await todoRep.create({
//    description: 'todo 1',
//    status: true,
//    important: false
//  })
// )
