import { Task } from '@entities/task'

export interface ITaskRepository {
  create(data: Task): Promise<Task>
  read(where: object): Promise<Task[]>
  findOne(where: object): Promise<Task | null>
  update(where: object, data: object): Promise<Task | null>
  delete(where: object): Promise<{ count: number }>
}
