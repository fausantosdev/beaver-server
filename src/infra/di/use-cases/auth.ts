import { ForgotPasswordUseCase } from '@app/use-cases/auth/forgot-password-use-case'
import { RefreshTokenUseCase } from '@app/use-cases/auth/refresh-token-use-case'
import { ResetPasswordUseCase } from '@app/use-cases/auth/reset-password-use-case'
import { SignInUseCase } from '@app/use-cases/auth/sign-in-use-case'
import { UserRepository } from '@data/repositories/user-repository'
import { EmailService } from '@lib/email-service'
import { EncryptionService } from '@lib/encryption-service'
import { JwtService } from '@lib/jwt-service'

export function createAuthUseCases() {
  const userRepository = new UserRepository()
  const encryptionService = new EncryptionService()
  const emailService = new EmailService()
  const jwtService = new JwtService()

  return {
    signIn: new SignInUseCase(userRepository, encryptionService, jwtService),
    refreshToken: new RefreshTokenUseCase(userRepository, jwtService),
    forgotPassword: new ForgotPasswordUseCase(userRepository, emailService),
    resetPassword: new ResetPasswordUseCase(userRepository, encryptionService),
  }
}
