import { UserRepository } from '@data/prisma/repositories/user-repository'
import { EmailService } from '@lib/email-service'
import { EncryptionHelper } from 'src/infra/services/encryption-helper'
import { JwtHelper } from 'src/infra/services/jwt-helper'

import { ForgotPasswordUseCase } from './forgot-password-use-case'
import { RefreshTokenUseCase } from './refresh-token-use-case'
import { ResetPasswordUseCase } from './reset-password-use-case'
import { SignInUseCase } from './sign-in-use-case'

export function createAuthUseCases() {
  const userRepository = new UserRepository()
  const encryptionHelper = new EncryptionHelper()
  const emailService = new EmailService()
  const jwtHelper = new JwtHelper()

  return {
    signIn: new SignInUseCase(userRepository, encryptionHelper, jwtHelper),
    refreshToken: new RefreshTokenUseCase(userRepository, jwtHelper),
    forgotPassword: new ForgotPasswordUseCase(userRepository, emailService),
    resetPassword: new ResetPasswordUseCase(userRepository, encryptionHelper),
  }
}
