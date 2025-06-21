import { Job } from '@app/interfaces/queue/job'
import { ForgotPasswordMail } from '@infra/queue/jobs/forgot-password-mail'
import { EmailService } from '@infra/services/email-service'

const forgotPasswordEmailJob = new ForgotPasswordMail(
  new EmailService()
)

// Fila de jobs
export const jobs: Job[] = [
  forgotPasswordEmailJob
]
