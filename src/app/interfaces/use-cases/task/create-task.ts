import { CreateTaskDto } from '@shared/dtos/task-dtos'
import { Response } from '@shared/utils/response-helper'

interface CreateTask {
  execute ({ parent_id, user_id, description }: CreateTaskDto): Promise<Response>
}

export { CreateTask }
