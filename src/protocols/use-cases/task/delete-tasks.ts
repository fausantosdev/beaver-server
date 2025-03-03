import { Response } from '@protocols/response'

export interface DeleteTasks{
  execute(where: object): Promise<Response>
}
