import { EditTaskDto } from '@dtos/task-dtos'
import { Response } from '@protocols/response'

export interface EditTask {
  execute(id: string, data: EditTaskDto): Promise<Response>
}
