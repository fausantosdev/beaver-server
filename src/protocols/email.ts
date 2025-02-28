export type SendEmailTypes = {
  from: string
  to: string
  subject: string
  text: string
}

export type SendEmailResponse = {
  status: boolean
  message: string
}

export interface Email {
  sendMail({from, to, subject, text}: SendEmailTypes): Promise<SendEmailResponse>
}
