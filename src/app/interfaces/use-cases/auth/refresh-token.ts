import { Response } from '@interfaces/response'

export interface RefreshToken {
  execute(token: string): Promise<Response>
}
