import { Task } from '@entities/task'
import { CreateTaskDto } from '@shared/dtos/task-dtos'

export interface ITaskRepository {
  create(data: CreateTaskDto): Promise<Task>
  read(where: object): Promise<Task[]>
  findOne(where: object): Promise<Task | null>
  update(where: object, data: object): Promise<Task | null>
  delete(where: object): Promise<{ count: number }>
}
