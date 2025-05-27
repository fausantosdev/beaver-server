import { Response } from '@interfaces/response'
import { CreateTaskDto } from '@shared/dtos/task-dtos'

export interface CreateTask {
  execute({ user_id, description, parent_id }: CreateTaskDto): Promise<Response>
}
