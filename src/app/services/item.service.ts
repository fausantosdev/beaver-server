import { ItemRepository } from '@repositories/item.repository'

import { ItemDto, CreateItemDto } from '@dtos/todo.dtos'

class ItemService {
  private repository: ItemRepository

  constructor() {
    this.repository = new ItemRepository()
  }

  public createTodo = async ({ todoId, description }: CreateItemDto): Promise<ItemDto> => {
    const newItem = await this.repository.create({ 
      todoId,
      description
    })

    return newItem
  }

  public getById = async (id: string) => {
    return await this.repository.findOne({ id })
  }

  public getAllByTodo = async (todoId: string) => {
    return await this.repository.read({ todoId })
  }

  public getMany = async (where = {}) => {
    const result = await this.repository.read(where)

    return result
  }

  public done = async (todoId: string, id: string) => {
    const itemExists = await this.repository.findOne({ todoId, id })

    if (!itemExists) throw new Error('Task list item not found')

    const data = !itemExists.done ? { done: true } : { done: false }
    
    const updatedItem = this.repository.update({ todoId, id }, data)
    
    return updatedItem
  }

  public edit = async (todoId: string, id: string, data: object) => {
    if (Object.keys(data).length === 0)  throw new Error('No data sent')

    const todoItemExists = await this.repository.read({ todoId, id })

    if (!todoItemExists) throw new Error('Task list item not found')

    const result = await this.repository.update({ todoId, id }, data)

    return result
  }

  public deleteOne = async (todoId: string, id: string) => {
    const itemExists = await this.repository.read({ todoId, id })

    if (itemExists.length == 0) throw new Error('Task list item not found')

    const result = await this.repository.delete({ todoId, id })

    return result
  }
}

export { ItemService }