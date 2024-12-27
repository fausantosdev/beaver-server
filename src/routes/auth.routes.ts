import { FastifyInstance } from 'fastify'

import { verifyToken } from '@middlewares/auth.middleware'

import { UserRepository } from '@repositories/user-repository'

import { SignInUseCase } from '@usecases/auth/sign-in-use-case'
import { SignInController } from '@controllers/auth/sign-in-controller'

import { RefreshTokenUseCase } from '@usecases/auth/refresh-token-use-case'
import { RefreshTokenController } from '@controllers/auth/refresh-token-controller'

import { ForgotPasswordUseCase } from '@usecases/auth/forgot-password-use-case'
import { ForgotPasswordController } from '@controllers/auth/forgot-password-controller'

import { ResetPasswordUseCase } from '@usecases/auth/reset-password-use-case'
import { ResetPasswordController } from '@controllers/auth/reset-password-controller'

const userRepository = new UserRepository()

const signInUseCase = new SignInUseCase(userRepository)
const signInController = new SignInController(signInUseCase)

const refreshTokenUseCase = new RefreshTokenUseCase(userRepository)
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository)
const forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase)

const resetPasswordUseCase = new ResetPasswordUseCase(userRepository)
const resetPasswordController = new ResetPasswordController(resetPasswordUseCase)

export async function authRoutes (app: FastifyInstance) {
  app.post('/sign-in', async (request, reply) => {
    const result = await signInController.handle(request)

    return reply.send(result)
  })

  app.post('/token-refresh', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await refreshTokenController.handle(request)

    return reply.send(result)
  })

  app.post('/forgot-password', async (request, reply) => {
    const result = await forgotPasswordController.handle(request)

    return reply.send(result)
  })

  app.post('/reset-password', async (request, reply) => {
    const result = await resetPasswordController.handle(request)

    return reply.send(result)
  })
}
