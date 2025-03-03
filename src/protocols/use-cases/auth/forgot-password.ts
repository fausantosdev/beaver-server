import { Response } from '@protocols/response'

export interface ForgotPassword {
  execute(email: string): Promise<Response>
}
