import { EditTaskDto } from '@interfaces/dtos/task-dtos'
import { Response } from '@interfaces/response'

export interface EditTask {
  execute(id: string, data: EditTaskDto): Promise<Response>
}
