import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { RefreshToken } from '@protocols/use-cases/auth/refresh-token'

class RefreshTokenController implements Controller {
  constructor(
    private refreshTokenUseCase: RefreshToken
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const token = request.headers?.authorization!.split(' ')[1]

    try {
      const { jwt } = await this.refreshTokenUseCase.execute(token)

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

export { RefreshTokenController }
