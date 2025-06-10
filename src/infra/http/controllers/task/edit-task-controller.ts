import { EditTask } from '@app/interfaces/use-cases/task/edit-task'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'

class EditTaskController {
  constructor(
    private editTaskUseCase: EditTask
  ) {}

  public handle = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schemaId = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const schema = z.object({
      description: z.string().min(2, { message: 'The text must have at least two characters' })
    })

    const { id } = schemaId.parse(request.params)
    const dataBody = schema.parse(request.body)

    const { status, data, message } = await this.editTaskUseCase.execute({
      where: {
        user_id: request.user.id,
        id: id
      },
      query: dataBody
    })

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { EditTaskController }
