import { ResetPasswordDto } from '@dtos/auth-dtos'
import { Response } from '@protocols/response'

export interface ResetPassword {
  execute({ token, email, newPassword }: ResetPasswordDto): Promise<Response>
}
