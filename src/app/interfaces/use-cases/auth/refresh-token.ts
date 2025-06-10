import { Response } from '@shared/utils/response-helper'

interface RefreshToken {
  execute (token: string): Promise<Response>
}

export { RefreshToken }
