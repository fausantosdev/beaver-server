import { SignInController } from './sign-in-controller'
import { RefreshTokenController } from './refresh-token-controller'
import { ForgotPasswordController } from './forgot-password-controller'
import { ResetPasswordController } from './reset-password-controller'

import { createAuthUseCases } from '@usecases/auth'

export function createAuthControllers() {
  const authUseCases = createAuthUseCases()

  return {
    signIn: new SignInController(authUseCases.signIn),
    refreshToken: new RefreshTokenController(authUseCases.refreshToken),
    forgotPassword: new ForgotPasswordController(authUseCases.forgotPassword),
    resetPassword: new ResetPasswordController(authUseCases.resetPassword)
  }
}
