import { Response } from '@interfaces/response'

export interface GetUsers {
  execute(where?: object): Promise<Response>
}
