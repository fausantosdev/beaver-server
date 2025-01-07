import { UserDto } from '@dtos/user.dtos'

export interface GetUsers {
  execute(where?: object): Promise<UserDto[] | UserDto>
}
