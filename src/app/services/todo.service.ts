import { TodoRepository } from '../repositories/todo.repository'

import { TodoDto, CreateTodoDto, EditTodoDto } from '../dtos/todo.dtos'

class TodoService {
  private repository: TodoRepository

  constructor() {
    this.repository = new TodoRepository()
  }

  public createTodo = async ({ userId, title }: CreateTodoDto): Promise<TodoDto> => {  
    const titleExists = await this.repository.read({ title })

    if (titleExists.length > 0) throw new Error('You already have a to-do list with this title')

    const newTodo = await this.repository.create({ 
      userId,
      title
    })

    return newTodo
  }

  public getById = async (id: string) => {
    return await this.repository.findOne({ id })
  }

  public getAllByUser = async (userId: string) => {
    return await this.repository.read({ userId })
  }

  public getMany = async (where = {}) => {
    const result = await this.repository.read(where)

    return result
  }

  public edit = async (userId: string, id: string, data: EditTodoDto) => {
    if (Object.keys(data).length === 0)  throw new Error('No data sent')

    const todoExists = await this.repository.read({ userId, id })

    if (!todoExists) throw new Error('Task list not found')

    if (data.title) {
      const titleExists = await this.repository.read({ title: data.title })

      if (titleExists.length > 0) throw new Error('You already have a to-do list with this title')
    }

    const result = await this.repository.update({ userId, id }, data)

    return result
  }

  public deleteOne = async (userId: string, id: string) => {
    const todoExists = await this.repository.read({ userId, id })

    if (todoExists.length == 0) throw new Error('Task list not found')

    const result = await this.repository.delete({ id })

    return result
  }
}

export { TodoService }