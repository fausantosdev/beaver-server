import { Response } from '@shared/types/response'

export interface GetUsers {
  execute(where?: object): Promise<Response>
}
