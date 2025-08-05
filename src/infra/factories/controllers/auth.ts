import { createAuthUseCases } from '@infra/factories/use-cases/auth'
import { AuthController } from '@infra/http/controllers/autn-controller'

import { createUserUseCases } from '../use-cases/user'

export function createAuthController() {
  const authUseCases = createAuthUseCases()
  const userUseCases = createUserUseCases()

  const authController = new AuthController(
    authUseCases.signIn,
    userUseCases.create,
    authUseCases.forgotPassword,
    authUseCases.resetPassword,
    authUseCases.refreshToken
  )

  return {
    signIn: authController.login,
    signUp: authController.register,
    forgotPassword: authController.forgotPassword,
    resetPassword: authController.resetPassword,
    refreshToken: authController.refreshToken
  }
}
