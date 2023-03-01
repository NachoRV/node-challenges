import { once } from 'node:events'
import Todo from '../entities/todo.js'
import { DEFAULT_HEADER } from '../util/util.js'
const routes = ({
  todoService
}) => ({
  '/todos:get': async (request, response) => {
    // throw new Error('test')
    const todos = await todoService.find()
    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify(todos))
    response.end()
  },
  '/todos/:id:get': async (request, response) => {
    const { id } = request
    console.log(id)
    const todos = await todoService.findOne(id)
    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify(todos))
    response.end()
  },
  '/todos:post': async (request, response) => {
    const data = await once(request, 'data')
    const item = JSON.parse(data)
    const todo = new Todo(item)
    const id = await todoService.create(todo)
    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify({
      id,
      success: 'todo created with success!!'
    }))
    return response.end()
  },
  '/todos/:id:put': async (request, response) => {
    const { id } = request
    const data = await once(request, 'data')
    const item = JSON.parse(data)
    await todoService.update({ id, ...item })
    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify({
      id,
      success: 'todo updated with success!!'
    }))
    return response.end()
  },
  '/todos/:id:delete': async (request, response) => {
    const { id } = request
    await todoService.delete(id)
    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify({
      id,
      success: 'todo delete with success!!'
    }))
    return response.end()
  }

})

export {
  routes
}
