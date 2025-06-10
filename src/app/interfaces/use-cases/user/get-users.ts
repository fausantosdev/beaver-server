import { Response } from '@shared/utils/response-helper'

interface GetUsers {
  execute (data?: object): Promise<Response>
}

export { GetUsers }
