import { Email, SendEmailTypes } from '@protocols/email'
import { Response } from '@protocols/response'
import { createTransport, Transporter } from 'nodemailer'
import { env } from 'src/env'

class EmailHelper implements Email {
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

      return { status: true, message: 'Email sent successfully' }
    } catch (error) {
      if (env.NODE_ENV === 'development') console.error('Error sending email:', error)
      return {
        status: false,
        message: 'An error occurred while sending the email, please try again',
      }
    }
  }
}

export { EmailHelper }
