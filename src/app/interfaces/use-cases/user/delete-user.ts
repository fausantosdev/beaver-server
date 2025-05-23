import { Response } from '@interfaces/response'

export interface DeleteUser {
  execute(id: string): Promise<Response>
}
