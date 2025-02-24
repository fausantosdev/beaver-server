import { Email, SendEmailTypes } from '@protocols/email'
import { createTransport, Transporter  } from 'nodemailer'

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

  async sendMail({to, subject, text}: SendEmailTypes): Promise<boolean> {
    const result = await this.transporter.sendMail({
      from: 'flavio-_santos@hotmail.com',
      to,
      subject,
      text,
    })

    if (result.accepted.length != 0) {
      return true
    } else {
      return false
    }
  }
}

export { EmailHelper }
