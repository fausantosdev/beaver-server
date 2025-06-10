import { Response } from '@shared/utils/response-helper'

interface GetTasks {
  execute (data?: object): Promise<Response>
}

export { GetTasks }
