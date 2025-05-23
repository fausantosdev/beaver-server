import { Response } from '@interfaces/response'

export interface ForgotPassword {
  execute(email: string): Promise<Response>
}
