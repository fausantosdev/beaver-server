import { Response } from '@shared/utils/response-helper'

interface DeleteUser {
  execute (id: string): Promise<Response>
}

export { DeleteUser }
