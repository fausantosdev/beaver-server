import { ResetPasswordDto } from '@shared/dtos/auth-dtos'
import { Response } from '@shared/utils/response-helper'

interface ResetPassword {
  execute ({ token, email, newPassword }: ResetPasswordDto): Promise<Response>
}

export { ResetPassword }
