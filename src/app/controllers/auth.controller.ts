import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AuthService } from '../services/auth.service' 

class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public signIn = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    try {
      const { email, password } = schema.parse(request.body)

      const result = await this.authService.signIn({ 
        email, 
        password
      })
  
      return reply.send({
        status: true,
        data: result,
        message: null
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }

  public tokenRefresh = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const token = request.headers.authorization!.split(' ')[1]
  
    try {
      const result = await this.authService.refreshToken(token)

      return reply.status(200).send({
        status: true,
        data: result,
        message: null
      })
    } catch (error: any) {
      return reply.status(error.code || 500).send({
        status: false,
        data: null,
        message: error.message
      })
    }

  }

  public forgotPassword = async (request: FastifyRequest, reply: FastifyReply) => {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
    })

    try {
      const { email } = schema.parse(request.body)

      const result = await this.authService.forgotPassword(email)
  
      return reply.send({
        status: true,
        data: result,
        message: 'You will receive a token in your email to recover your password'
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }

  public resetPassword = async (request: FastifyRequest, reply: FastifyReply) => {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      token: z.string({ required_error: 'The token is mandatory' }),
      password: z.string().min(8, { message: 'Your password must be longer than eight(8) characters' })
    })

    try {
      const { email, password, token } = schema.parse(request.body)

      const result = await this.authService.resetPassword({ 
        email, 
        newPassword: password,
        token
      })
  
      return reply.send({
        status: true,
        data: result,
        message: 'Password updated! Log in with your new password'
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }
}

export { AuthController }