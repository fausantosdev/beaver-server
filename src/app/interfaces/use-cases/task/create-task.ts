import { CreateTaskDto } from '@shared/dtos/task-dtos'
import { Response } from '@shared/types/response'

export interface CreateTask {
  execute({ user_id, description, parent_id }: CreateTaskDto): Promise<Response>
}
