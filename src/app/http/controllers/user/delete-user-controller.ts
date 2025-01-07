import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { DeleteUser } from '@protocols/use-cases/user/delete-user'

class DeleteUserController implements Controller {
  constructor(
    private deleteUserUseCase: DeleteUser
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const schema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    try {
      const { id } = schema.parse(request.params)

      const result = await this.deleteUserUseCase.execute(id)

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

export { DeleteUserController }
