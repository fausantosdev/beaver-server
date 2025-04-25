import { Response } from '@interfaces/response'

export interface GetTasks {
  execute(where?: object): Promise<Response>
}
