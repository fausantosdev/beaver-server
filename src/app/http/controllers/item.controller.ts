import { ItemService } from '@services/item.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class ItemController {
  private itemService: ItemService

  constructor() {
    this.itemService = new ItemService()
  }

  public store = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      todoId: z.string().uuid({ message: 'Incorrect ID format' }),
      description: z.string().min(2, { message: 'Must be 2 or more characters long' })
    })

    try {
      const { todoId, description } = schema.parse(request.body)

      const todo = await this.itemService.createTodo({
        todoId,
        description
      })

      return reply.send({
        status: true,
        data: todo,
        message: null
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }

  public readByTodo = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      todoId: z.string().uuid({ message: 'Incorrect ID format' }),
    })

    try {
      const { todoId } = schema.parse(request.params)

      const todos = await this.itemService.getAllByTodo(todoId)

      return reply.send({
        status: true,
        data: todos,
        message: null
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }

  public doneItem = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      todoId: z.string().uuid({ message: 'Incorrect ID format' }),
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    try {
      const { todoId, id } = schema.parse(request.params)

      const item = await this.itemService.done(todoId, id)

      return reply.send({
        status: true,
        data: item,
        message: null
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }

  public delete = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      todoId: z.string().uuid({ message: 'Incorrect ID format' }),
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    try {
      const { todoId, id } = schema.parse(request.params)

      const result = await this.itemService.deleteOne(todoId, id)

      return reply.send({
        status: true,
        data: result,
        message: null
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }
}

export { ItemController }
