import { CreateUserDto } from '@dtos/user.dtos'
import { Response } from '@protocols/response'

export interface CreateUser {
  execute({ name, email, password_hash }: CreateUserDto): Promise<Response>
}
