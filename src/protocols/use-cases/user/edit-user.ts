import { UpdateUserDto, UserDto } from '@dtos/user.dtos'

export interface EditUser {
  execute(id: string, data: UpdateUserDto): Promise<UserDto>
}
