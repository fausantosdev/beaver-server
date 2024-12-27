import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { SignIn } from '@protocols/use-cases/auth/sign-in'

class SignInController implements Controller {
  constructor(
    private signInUseCase: SignIn
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    try {
      const { email, password } = schema.parse(request.body)

      const { jwt } = await this.signInUseCase.execute({ email, password })

      return {
        status: true,
        data: jwt,
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

export { SignInController }
