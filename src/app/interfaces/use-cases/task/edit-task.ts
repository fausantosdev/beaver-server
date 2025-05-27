import { Response } from '@interfaces/response'
import { EditTaskDto } from '@shared/dtos/task-dtos'

export interface EditTask {
  execute(id: string, data: EditTaskDto): Promise<Response>
}
