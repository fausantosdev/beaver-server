import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { ResetPassword } from '@protocols/use-cases/auth/reset-password'

class ResetPasswordController implements Controller {
  constructor(
    private resetPasswordUseCase: ResetPassword
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { token, email, newPassword } = request.body

    try {
      const result = await this.resetPasswordUseCase.execute({ token, email, newPassword })

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

export { ResetPasswordController }
