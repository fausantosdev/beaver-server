import { CreateUserDto } from '@shared/dtos/user-dtos'
import { Response } from '@shared/utils/response-helper'

interface CreateUser {
  execute ({ name, email, password_hash }: CreateUserDto): Promise<Response>
}

export { CreateUser }
