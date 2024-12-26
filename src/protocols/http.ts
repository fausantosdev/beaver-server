export interface HttpResponse {
  status: boolean
  data: any
  message: string | null
}

export interface HttpRequest {
  body?: any
  params?: any
  headers?: { [key: string]: any }
}
