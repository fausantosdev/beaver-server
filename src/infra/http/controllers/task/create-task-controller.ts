import { CreateTask } from '@app/interfaces/use-cases/task/create-task'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'

class CreateTaskController {
  constructor(
    private createTaskUseCase: CreateTask
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      parent_id: z.string().uuid().optional(),
      description: z.string().min(2, { message: 'The text must have at least two characters' })
    })

    const { description, parent_id } = schema.parse(request.body)

    const { user } = request

    const { status, data, message } = await this.createTaskUseCase.execute({
      user_id: user.id, description, parent_id
    })

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { CreateTaskController }
