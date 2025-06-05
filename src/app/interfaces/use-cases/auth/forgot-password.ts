import { Response } from '@shared/types/response'

export interface ForgotPassword {
  execute(email: string): Promise<Response>
}
