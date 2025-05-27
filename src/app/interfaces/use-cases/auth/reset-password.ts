import { Response } from '@interfaces/response'
import { ResetPasswordDto } from '@shared/dtos/auth-dtos'

export interface ResetPassword {
  execute({ token, email, newPassword }: ResetPasswordDto): Promise<Response>
}
