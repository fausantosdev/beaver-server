import { Response } from '@shared/types/response'

export interface DeleteUser {
  execute(id: string): Promise<Response>
}
