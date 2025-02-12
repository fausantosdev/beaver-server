import { UserRepository } from '@data/prisma/repositories/user-repository'

import { ForgotPasswordUseCase } from './forgot-password-use-case'
import { RefreshTokenUseCase } from './refresh-token-use-case'
import { ResetPasswordUseCase } from './reset-password-use-case'
import { SignInUseCase } from './sign-in-use-case'

export function createAuthUseCases() {
  const userRepository = new UserRepository()

  return {
    signIn: new SignInUseCase(userRepository),
    refreshToken: new RefreshTokenUseCase(userRepository),
    forgotPassword: new ForgotPasswordUseCase(userRepository),
    resetPassword: new ResetPasswordUseCase(userRepository),
  }
}
