import { EditUser } from '@app/interfaces/use-cases/user/edit-user'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'

class EditUserController {
  constructor(
    private editUserUseCase: EditUser
  ) {}

  public handle = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schemaId = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }).optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      role: z.enum(['user', 'admin']).optional(),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' }).optional()
    })

    const { id } = schemaId.parse(request.params)

    const dataBody = schema.parse(request.body)

    const { status, data, message } = await this.editUserUseCase.execute(id, dataBody)

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { EditUserController }
