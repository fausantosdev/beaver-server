import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserService } from '../services/user.service'

class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public store = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    try {
      const { name, email, password } = schema.parse(request.body)

      const user = await this.userService.createUser({ 
        name,
        email, 
        password_hash: password
      })
  
      return reply.send({
        status: true,
        data: user,
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

  public read = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {  
    try {
      const users = await this.userService.getMany()
      
      return reply.send({
        status: true,
        data: users,
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

  public show = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })
      
    try {
      const { id } = schema.parse(request.params)

      const users = await this.userService.getById(id)
      
      return reply.send({
        status: true,
        data: users,
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

  public update = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schemaId = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })
    
    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }).optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      role: z.enum(['user', 'admin']).optional(),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' }).optional()
    })

    try {
      const { id } = schemaId.parse(request.params)
      const data = schema.parse(request.body)

      const user = await this.userService.edit(id, data)
  
      return reply.send({
        status: true,
        data: user,
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

  public delete = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })
    
    try {
      const { id } = schema.parse(request.params)

      const result = await this.userService.deleteUser(id)
  
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
}

export { UserController }