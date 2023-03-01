import { join, dirname } from 'node:path'
import { parse, fileURLToPath } from 'node:url'
import { generateTodoInstance } from './factories/todoFactory.js'
import { routes } from './routes/todoRoute.js'
import { DEFAULT_HEADER } from './util/util.js'

const currentDir = dirname(
  fileURLToPath(
    import.meta.url
  )
)
const filePath = join(currentDir, './../database', 'data.json')
const todoService = generateTodoInstance({ filePath })
const todoRoute = routes({
  todoService
})

const allRoutes = {
  ...todoRoute,
  // 404
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADER)
    response.write('Not found!!!')
    response.end()
  }
}
function handler (request, response) {
  const { url, method } = request
  const matches = url.split('/')
  const id = matches[2]
  const { pathname } = parse(url, true)
  const key = id ? `/${matches[1]}/:id:${method.toLowerCase()}` : `/${matches[1]}:${method.toLowerCase()}`
  request.id = id
  console.log({ key, pathname, url, method })
  const route = allRoutes[key] || allRoutes.default
  return Promise.resolve(route(request, response)).catch(handlerError(response))
}

function handlerError (response) {
  return error => {
    console.log('Something bad has happened***', error.stack)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({
      error: 'Internal server error'
    }))
    return response.end()
  }
}
export {
  handler
}
