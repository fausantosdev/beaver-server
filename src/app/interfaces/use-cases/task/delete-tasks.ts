import { Response } from '@interfaces/response'

export interface DeleteTasks{
  execute(where: object): Promise<Response>
}
