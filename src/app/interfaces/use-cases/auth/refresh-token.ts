import { Response } from '@shared/types/response'

export interface RefreshToken {
  execute(token: string): Promise<Response>
}
