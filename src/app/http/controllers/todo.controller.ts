import { Repository } from '@protocols/repository'
import { TodoRepository } from '@repositories/todo.repository'
import { TodoService } from '@services/todo.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class TodoController {
  private todoService: TodoService
  private todoRepository: Repository

  constructor() {
    this.todoRepository = new TodoRepository()
    this.todoService = new TodoService(this.todoRepository)
  }

  public store = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      title: z.string().min(2, { message: 'Must be 2 or more characters long' })
    })

    try {
      const { id } = request.user
      const { title } = schema.parse(request.body)

      const todo = await this.todoService.createTodo({
        userId: id,
        title
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

  public readByUser = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    try {
      const { id } = request.user

      const todos = await this.todoService.getAllByUser(id)

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

  public update = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const paramsSchema = z.object({
     id: z.string().min(2, { message: 'Must be 2 or more characters long' })
    })

    const bodySchema = z.object({
      title: z.string().min(2, { message: 'Must be 2 or more characters long' })
    })

    try {
      const { id: userId } = request.user
      const { id } = paramsSchema.parse(request.params)
      const { title } = bodySchema.parse(request.body)

      const user = await this.todoService.edit(userId, id, { title })

      return reply.send({
        status: true,
        data: user,
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
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    try {
      const { id: userId } = request.user
      const { id } = schema.parse(request.body)

      const result = await this.todoService.deleteOne(userId, id)

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

export { TodoController }
