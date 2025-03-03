import { Response } from '@protocols/response'

export interface RefreshToken {
  execute(token: string): Promise<Response>
}
