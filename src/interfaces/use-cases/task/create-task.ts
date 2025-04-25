import { CreateTaskDto } from '@interfaces/dtos/task-dtos'
import { Response } from '@interfaces/response'

export interface CreateTask {
  execute({ user_id, description, parent_id }: CreateTaskDto): Promise<Response>
}
