import { CreateUserDto, UserDto } from '@dtos/user.dtos'

export interface CreateUser {
  execute({ name, email, password_hash }: CreateUserDto): Promise<UserDto>
}
