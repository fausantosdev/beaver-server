import { Job } from '@app/interfaces/job'
import { Email } from '@app/interfaces/services/email'

class ForgotPasswordMail implements Job {
  public readonly key = 'ForgotPasswordEmail'

  constructor(
    private emailService: Email
  ) {}

  public handle = async ({ data: { email, token } }: {
    data: {
      email: string,
      token: string
    }
  }): Promise<void> => {
    await this.emailService.sendMail({
      from: 'noreply@beaversaas.com',
      to: email,
      subject: '[Beaver SaaS] - Password recovery',
      text: `Use this token to recover your password: ${token}\nIf you didn't request this recovery, just disregard this email, your data is safe.`
    })
  }
}

export { ForgotPasswordMail }
