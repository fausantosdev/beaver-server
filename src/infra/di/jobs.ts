import { Job } from '@app/interfaces/job'
import { ForgotPasswordMail } from '@app/jobs/forgot-password-mail'
import { EmailService } from '@infra/services/email-service'

const forgotPasswordEmailJob = new ForgotPasswordMail(
  new EmailService()
)

// Fila de jobs
export const jobs: Job[] = [
  forgotPasswordEmailJob
]
