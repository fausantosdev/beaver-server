import { env } from '@config/env'
import { Email, SendEmailTypes } from '@interfaces/services/email'
import { Response } from '@shared/types/response'
import { response } from '@shared/utils/response-helper'
import { createTransport, Transporter } from 'nodemailer'

class EmailService implements Email {
  private transporter: Transporter

  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })
  }

  async sendMail({ from, to, subject, text }: SendEmailTypes): Promise<Response> {
    try {
      await this.transporter.sendMail({
        from,
        to,
        subject,
        text,
      })

      return response({ message: 'Email sent successfully' })
    } catch (error) {
      if (env.NODE_ENV === 'development') console.error('Error sending email:', error)
      return response({
        status: false,
        message: 'An error occurred while sending the email, please try again',
      })
    }
  }
}

export { EmailService }
