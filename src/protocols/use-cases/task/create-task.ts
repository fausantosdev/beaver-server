import { CreateTaskDto, TaskDto } from '@dtos/task-dtos'

export interface CreateTask {
  execute({ user_id, description, parent_id }: CreateTaskDto): Promise<TaskDto>
}
