import { ForgotPassword } from '@app/interfaces/use-cases/auth/forgot-password'
import { RefreshToken } from '@app/interfaces/use-cases/auth/refresh-token'
import { ResetPassword } from '@app/interfaces/use-cases/auth/reset-password'
import { SignIn } from '@app/interfaces/use-cases/auth/sign-in'
import { CreateUser } from '@app/interfaces/use-cases/user/create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class AuthController {
  constructor(
    private readonly signInUseCase: SignIn,
    private readonly createUserUseCase: CreateUser,
    private readonly forgotPasswordUseCase: ForgotPassword,
    private readonly resetPasswordUseCase: ResetPassword,
    private readonly refreshTokenUseCase: RefreshToken
  ) {}

  public login = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    const { email, password } = schema.parse(request.body)

    const { status, data, message } = await this.signInUseCase.execute({ email, password })

    return response.send({
      status,
      data,
      message
    })
  }

  public register = async (request: FastifyRequest, response: FastifyReply): Promise<void> =>{
    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    const { name, email, password } = schema.parse(request.body)

    const { status, data, message } = await this.createUserUseCase.execute({
      name,
      email,
      password_hash: password
    })

    response.send({
      status,
      data,
      message
    })

    return
  }

  public forgotPassword = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' })
    })

    const { email } = schema.parse(request.body)

    const { status, data, message } = await this.forgotPasswordUseCase.execute(email)

    response.send({
      status,
      data: data,
      message
    })

    return
  }

  public resetPassword = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      token: z.string().min(35, { message: 'You need to send the token' }),
      email: z.string().email({ message: 'Invalid email address' }),
      newPassword: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    const { token, email, newPassword } = schema.parse(request.body)

    const { status, data, message } = await this.resetPasswordUseCase.execute({ token, email, newPassword })

    response.send({
      status,
      data,
      message
    })

    return
  }

  public refreshToken = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const token = request.headers?.authorization!.split(' ')[1]

    const { status, data, message } = await this.refreshTokenUseCase.execute(token)

    response.send({
      status,
      data,
      message
    })

    return
  }
}

export { AuthController }
