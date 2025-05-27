import { CreateUserDto } from '@app/dtos/user.dtos'
import { Response } from '@interfaces/response'

export interface CreateUser {
  execute({ name, email, password_hash }: CreateUserDto): Promise<Response>
}
