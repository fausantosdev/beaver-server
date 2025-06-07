type Response = {
  status?: boolean,
  data?: any
  message?: string
}

function response({ status = true, data = null, message = '' }: Response): Response {
  return {
    status,
    data,
    message
  }
}

export { response, Response }
