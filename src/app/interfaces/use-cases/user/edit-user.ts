import { Response } from '@interfaces/response'
import { UpdateUserDto } from '@shared/dtos/user.dtos'

export interface EditUser {
  execute(id: string, data: UpdateUserDto): Promise<Response>
}
