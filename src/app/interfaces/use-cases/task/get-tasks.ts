import { Response } from '@shared/types/response'

export interface GetTasks {
  execute(where?: object): Promise<Response>
}
