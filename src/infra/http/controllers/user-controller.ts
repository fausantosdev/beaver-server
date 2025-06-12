import { CreateUser } from '@app/interfaces/use-cases/user/create-user'
import { DeleteUser } from '@app/interfaces/use-cases/user/delete-user'
import { EditUser } from '@app/interfaces/use-cases/user/edit-user'
import { GetUsers } from '@app/interfaces/use-cases/user/get-users'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class UserController {
  constructor(
    private createUserUseCase: CreateUser,
    private getUsersUseCase: GetUsers,
    private editUserUseCase: EditUser,
    private deleteUserUseCase: DeleteUser
  ) {}

  public create = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    const { name, email, password } = schema.parse(request.body)

    const { status, data, message } = await this.createUserUseCase.execute({
      name,
      email,
      password_hash: password
    })

    response.send({
      status,
      data,
      message
    })

    return
  }

  public read = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      id: z.string().uuid({ message: 'Id is required' })
    })

    const { id } = schema.parse(request.params)

    const { status, data, message } = id ?
      await this.getUsersUseCase.execute({ id }) :
      await this.getUsersUseCase.execute()

    response.send({
      status,
      data,
      message
    })

    return
  }

  public update = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
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

    const { status, data, message } = await this.editUserUseCase.execute({
      id,
      data: dataBody
    })

    response.send({
      status,
      data,
      message
    })

    return
  }

  public delete = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const { id } = schema.parse(request.params)

    const { status, data, message } = await this.deleteUserUseCase.execute(id)

    response.send({
      status,
      data,
      message
    })

    return
  }
}

export { UserController }
