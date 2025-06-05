import { EditTaskDto } from '@shared/dtos/task-dtos'
import { Response } from '@shared/types/response'

export interface EditTask {
  execute(id: string, data: EditTaskDto): Promise<Response>
}
