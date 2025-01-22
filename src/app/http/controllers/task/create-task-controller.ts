import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { CreateTask } from '@protocols/use-cases/task/create-task'

class CreateTaskController implements Controller {
  constructor(
    private createTaskUseCase: CreateTask
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const schema = z.object({
      parent_id: z.string().uuid().optional(),
      description: z.string().min(2, { message: 'The text must have at least two characters' })
    })

    try {
      const { description, parent_id } = schema.parse(request.body)

      const { user } = request

      const task = await this.createTaskUseCase.execute({
        user_id: user.id, description, parent_id
      })

      return {
        status: true,
        data: task,
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

export { CreateTaskController }
