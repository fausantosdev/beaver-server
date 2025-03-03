import { Response } from '@protocols/response'

export interface GetTasks {
  execute(where?: object): Promise<Response>
}
