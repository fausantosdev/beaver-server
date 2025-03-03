import { Response } from '@protocols/response'

export interface GetUsers {
  execute(where?: object): Promise<Response>
}
