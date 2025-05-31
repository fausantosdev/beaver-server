import { createAuthUseCases } from '@infra/di/use-cases/auth'

import { ForgotPasswordController } from './forgot-password-controller'
import { RefreshTokenController } from './refresh-token-controller'
import { ResetPasswordController } from './reset-password-controller'
import { SignInController } from './sign-in-controller'

export function createAuthControllers() {
  const authUseCases = createAuthUseCases()

  return {
    signIn: new SignInController(authUseCases.signIn),
    refreshToken: new RefreshTokenController(authUseCases.refreshToken),
    forgotPassword: new ForgotPasswordController(authUseCases.forgotPassword),
    resetPassword: new ResetPasswordController(authUseCases.resetPassword)
  }
}
