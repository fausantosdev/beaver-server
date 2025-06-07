import { createAuthUseCases } from '@infra/di/use-cases/auth'
import { ForgotPasswordController } from '@infra/http/controllers/auth/forgot-password-controller'
import { RefreshTokenController } from '@infra/http/controllers/auth/refresh-token-controller'
import { ResetPasswordController } from '@infra/http/controllers/auth/reset-password-controller'
import { SignInController } from '@infra/http/controllers/auth/sign-in-controller'

export function createAuthControllers() {
  const authUseCases = createAuthUseCases()

  return {
    signIn: new SignInController(authUseCases.signIn),
    refreshToken: new RefreshTokenController(authUseCases.refreshToken),
    forgotPassword: new ForgotPasswordController(authUseCases.forgotPassword),
    resetPassword: new ResetPasswordController(authUseCases.resetPassword)
  }
}
