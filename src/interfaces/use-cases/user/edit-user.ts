import { UpdateUserDto } from '@interfaces/dtos/user.dtos'
import { Response } from '@interfaces/response'

export interface EditUser {
  execute(id: string, data: UpdateUserDto): Promise<Response>
}
