import { Response } from '@shared/types/response'

export interface DeleteTasks{
  execute(where: object): Promise<Response>
}
