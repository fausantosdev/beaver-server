import { Response } from '@shared/utils/response-helper'

interface ForgotPassword {
  execute (email: string): Promise<Response>
}

export { ForgotPassword }
