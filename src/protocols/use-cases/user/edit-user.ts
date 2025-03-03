import { UpdateUserDto } from '@dtos/user.dtos'
import { Response } from '@protocols/response'

export interface EditUser {
  execute(id: string, data: UpdateUserDto): Promise<Response>
}
