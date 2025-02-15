export type SendEmailTypes = {
  to: string
  subject: string
  text: string
}

export interface Email {
  sendMail({to, subject, text}: SendEmailTypes): Promise<boolean>
}
