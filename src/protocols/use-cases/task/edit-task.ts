import { EditTaskDto, TaskDto } from '@dtos/task-dtos'

export interface EditTask {
  execute(id: string, data: EditTaskDto): Promise<TaskDto>
}
