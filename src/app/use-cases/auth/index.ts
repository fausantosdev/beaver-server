import { UserRepository } from '@data/prisma/repositories/user-repository'
import { EmailService } from '@lib/email-service'
import { EncryptionService } from '@lib/encryption-service'
import { JwtService } from '@lib/jwt-service'

import { ForgotPasswordUseCase } from './forgot-password-use-case'
import { RefreshTokenUseCase } from './refresh-token-use-case'
import { ResetPasswordUseCase } from './reset-password-use-case'
import { SignInUseCase } from './sign-in-use-case'

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
