import { Response } from '@shared/utils/response-helper'

export type SendEmailTypes = {
  from: string
  to: string
  subject: string
  text: string
}

export interface Email {
  sendMail({from, to, subject, text}: SendEmailTypes): Promise<Response>
}
