import { ResetPasswordDto } from '@shared/dtos/auth-dtos'
import { Response } from '@shared/types/response'

export interface ResetPassword {
  execute({ token, email, newPassword }: ResetPasswordDto): Promise<Response>
}
