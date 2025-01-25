import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { EditUser } from '@protocols/use-cases/user/edit-user'

class EditUserController implements Controller {
  constructor(
    private editUserUseCase: EditUser
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const schemaId = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }).optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      role: z.enum(['user', 'admin']).optional(),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' }).optional()
    })

    try {
      const { id } = schemaId.parse(request.params)
      const data = schema.parse(request.body)

      const user = await this.editUserUseCase.execute(id, data)

      return {
        status: true,
        data: user,
        message: null
      }
    } catch (error: any) {
      return {
        status: false,
        data: null,
        message: error.message
      }
    }
  }
}

export { EditUserController }
