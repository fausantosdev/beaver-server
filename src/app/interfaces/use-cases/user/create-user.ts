import { Response } from '@interfaces/response'
import { CreateUserDto } from '@shared/dtos/user.dtos'

export interface CreateUser {
  execute({ name, email, password_hash }: CreateUserDto): Promise<Response>
}
