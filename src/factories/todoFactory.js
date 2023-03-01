import TodoRepository from '../repositories/todoRepository.js'
import TodoService from '../services/todoService.js'

export const generateTodoInstance = ({ filePath }) => {
  const todoRepository = new TodoRepository({ filePath })
  const todoService = new TodoService({ todoRepository })
  return todoService
}
