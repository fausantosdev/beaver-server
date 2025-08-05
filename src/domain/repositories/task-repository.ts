import { Task } from '@domain/entities/task'

export interface TaskRepository {
  create(data: object): Promise<Task>
  read(where: object): Promise<Task[]>
  findOne(where: object): Promise<Task | null>
  update(where: object, data: object): Promise<Task | null>
  delete(where: object): Promise<{ count: number }>
}
