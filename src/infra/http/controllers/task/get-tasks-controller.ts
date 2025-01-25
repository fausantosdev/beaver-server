import { z } from 'zod'

import { Controller } from '@protocols/controller'
import { HttpRequest, HttpResponse } from '@protocols/http'
import { GetTasks } from '@protocols/use-cases/task/get-tasks'


class GetTasksController implements Controller {
  constructor(
    private getTasksUseCase: GetTasks
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {

    try {
      const { id } = request.params
      const { user } = request

      let query

      if(id) {
        query = { id, user_id: user.id, parent_id: null }
      }else {
        query = { user_id: user.id, parent_id: null }
      }

      const result = await this.getTasksUseCase.execute(query)

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

export { GetTasksController }
