import { DeleteTaskDto } from '@shared/dtos/task-dtos'
import { Response } from '@shared/utils/response-helper'

interface DeleteTasks {
  execute ({ user_id, tasksIds }: DeleteTaskDto): Promise<Response>
}

export { DeleteTasks }
