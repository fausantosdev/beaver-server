import { UpdateUserDto } from '@shared/dtos/user-dtos'
import { Response } from '@shared/utils/response-helper'

interface EditUser {
  execute ({ id, data }: UpdateUserDto): Promise<Response>
}

export { EditUser }
