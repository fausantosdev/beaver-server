import { UpdateUserDto } from '@shared/dtos/user-dtos'
import { Response } from '@shared/types/response'

export interface EditUser {
  execute(id: string, data: UpdateUserDto): Promise<Response>
}
