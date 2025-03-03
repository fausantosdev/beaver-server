import { CreateTaskDto } from '@dtos/task-dtos'
import { Response } from '@protocols/response'

export interface CreateTask {
  execute({ user_id, description, parent_id }: CreateTaskDto): Promise<Response>
}
