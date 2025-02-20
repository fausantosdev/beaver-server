import { UserRepository } from '@data/prisma/repositories/user-repository'
import { EmailHelper } from '@lib/email-helper'
import { EncryptionHelper } from '@lib/encryption-helper'
import { JwtHelper } from '@lib/jwt-helper'

import { ForgotPasswordUseCase } from './forgot-password-use-case'
import { RefreshTokenUseCase } from './refresh-token-use-case'
import { ResetPasswordUseCase } from './reset-password-use-case'
import { SignInUseCase } from './sign-in-use-case'

export function createAuthUseCases() {
  const userRepository = new UserRepository()
  const encryptionHelper = new EncryptionHelper()
  const emailHelper = new EmailHelper()
  const jwtHelper = new JwtHelper()

  return {
    signIn: new SignInUseCase(userRepository, encryptionHelper, jwtHelper),
    refreshToken: new RefreshTokenUseCase(userRepository, jwtHelper),
    forgotPassword: new ForgotPasswordUseCase(userRepository, emailHelper),
    resetPassword: new ResetPasswordUseCase(userRepository, encryptionHelper),
  }
}
