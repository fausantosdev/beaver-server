import { ResetPasswordDto } from '@app/dtos/auth-dtos'
import { Response } from '@interfaces/response'

export interface ResetPassword {
  execute({ token, email, newPassword }: ResetPasswordDto): Promise<Response>
}
