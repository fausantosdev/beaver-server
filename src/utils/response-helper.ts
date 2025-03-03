import { Response } from '@protocols/response'

type Props = {
  status?: boolean,
  data?: any,
  message?: string
}

export function response({ status = true, data = null, message = '' }: Props): Response{
  return {
    status,
    data,
    message
  }
}
