import { ResetPasswordDto } from '@dtos/auth-dtos'

export interface ResetPassword {
  execute({ token, email, newPassword }: ResetPasswordDto): Promise<boolean>
}
