import { EditTaskDto } from '@shared/dtos/task-dtos'
import { Response } from '@shared/utils/response-helper'

interface EditTask {
  execute ({ query, where }: EditTaskDto): Promise<Response>
}

export { EditTask }
