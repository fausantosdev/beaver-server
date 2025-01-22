import { TaskDto } from '@dtos/task-dtos'

export interface GetTasks {
  execute(where?: object): Promise<TaskDto[] | TaskDto>
}
