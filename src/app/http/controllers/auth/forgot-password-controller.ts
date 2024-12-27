import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { ForgotPassword } from '@protocols/use-cases/auth/forgot-password'

class ForgotPasswordController implements Controller {
  constructor(
    private forgotPasswordUseCase: ForgotPassword
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email } = request.body

    try {
      const result = await this.forgotPasswordUseCase.execute(email)

      return {
        status: true,
        data: result,
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

export { ForgotPasswordController }
