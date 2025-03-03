import { Response } from '@protocols/response'

export interface DeleteUser {
  execute(id: string): Promise<Response>
}
