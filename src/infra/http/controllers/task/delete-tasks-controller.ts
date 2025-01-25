import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { DeleteTasks } from '@protocols/use-cases/task/delete-tasks'


class DeleteTasksController implements Controller {
  constructor(
    private deleteTasksUseCase: DeleteTasks
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const schema = z.object({
      tasks_ids: z.array(z.string().uuid()).min(1, 'You have not selected any tasks')
    })

    try {
      const { tasks_ids } = schema.parse(request.body)

      const result = await this.deleteTasksUseCase.execute({
        id: {
          in: tasks_ids
        },
        user_id: request.user.id
      })

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

export { DeleteTasksController }
