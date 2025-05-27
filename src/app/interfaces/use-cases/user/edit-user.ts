import { UpdateUserDto } from '@app/dtos/user.dtos'
import { Response } from '@interfaces/response'

export interface EditUser {
  execute(id: string, data: UpdateUserDto): Promise<Response>
}
