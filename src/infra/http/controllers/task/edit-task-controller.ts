import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { EditTask } from '@protocols/use-cases/task/edit-task'

class EditTaskController implements Controller {
  constructor(
    private editTaskUseCase: EditTask
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const schemaId = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const schema = z.object({
      description: z.string().min(2, { message: 'The text must have at least two characters' })
    })

    try {
      const { id } = schemaId.parse(request.params)
      const data = schema.parse(request.body)

      const user = await this.editTaskUseCase.execute(id, data)

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

export { EditTaskController }
