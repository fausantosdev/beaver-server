import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { CreateUser } from '@protocols/use-cases/user/create-user'

class CreateUserController implements Controller {
  constructor(
    private createUserUseCase: CreateUser
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    try {
      const { name, email, password } = schema.parse(request.body)

      const user = await this.createUserUseCase.execute({
        name,
        email,
        password_hash: password
      })

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

export { CreateUserController }
