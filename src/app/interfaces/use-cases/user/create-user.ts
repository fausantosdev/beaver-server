import { CreateUserDto } from '@shared/dtos/user-dtos'
import { Response } from '@shared/types/response'

export interface CreateUser {
  execute({ name, email, password_hash }: CreateUserDto): Promise<Response>
}
