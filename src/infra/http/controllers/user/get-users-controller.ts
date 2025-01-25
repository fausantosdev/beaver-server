import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { GetUsers } from '@protocols/use-cases/user/get-users'

class GetUsersController implements Controller {
  constructor(
    private getUsersUseCase: GetUsers
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {

    try {
      const { id } = request.params

      const result = id ?
        await this.getUsersUseCase.execute({ id }) :
        await this.getUsersUseCase.execute()

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

export { GetUsersController }
