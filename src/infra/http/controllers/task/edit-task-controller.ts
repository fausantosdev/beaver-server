import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { EditTask } from '@protocols/use-cases/task/edit-task'

class EditTaskController {
  constructor(
    private editTaskUseCase: EditTask
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schemaId = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const schema = z.object({
      description: z.string().min(2, { message: 'The text must have at least two characters' })
    })

    try {
      const { id } = schemaId.parse(request.params)
      const data = schema.parse(request.body)

      const user = await this.editTaskUseCase.execute(id, data)

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
}

export { EditTaskController }
