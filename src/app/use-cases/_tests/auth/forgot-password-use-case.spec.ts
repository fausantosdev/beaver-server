import { Email, SendEmailTypes } from '@app/interfaces/services/email'
import { ForgotPasswordUseCase } from '@app/use-cases/auth/forgot-password-use-case'
import { InMemoryUserRepository } from '@infra/data/_test/repositories/in-memory-user-repository'
import { Response, response } from '@shared/utils/response-helper'

const makeEmailService = () => {
  class EmailServiceStub implements Email {
    sendMail({ to, subject, text }: SendEmailTypes): Promise<Response> {
      return Promise.resolve(response({
        message: 'Email sent successfully'
      }))
    }
  }

  return new EmailServiceStub()
}

const makeSut = () => {
  const EmailServiceStub = makeEmailService()
  const inMemoryUserRepositoryStub = new InMemoryUserRepository()

  const forgotPasswordSUT = new ForgotPasswordUseCase(
    inMemoryUserRepositoryStub,
    EmailServiceStub
  )

  return {
    forgotPasswordSUT,
    inMemoryUserRepositoryStub,
    EmailServiceStub
  }
}

describe('Forgot password use case', () => {
  it('Should return an error response if the provided email does not exist', async () => {
    const { forgotPasswordSUT } = makeSut()

    await expect(forgotPasswordSUT.execute('johndoe2@mail.com'))
      .resolves.toEqual(response({
        status: false,
        message: 'E-mail not found'
      }))
  })

  it('Should return an error response if password_reset_token and password reset expires are not updated', async () => {
    const { forgotPasswordSUT, inMemoryUserRepositoryStub } = makeSut()

    jest.spyOn(inMemoryUserRepositoryStub, 'update').mockResolvedValueOnce(null)

    await expect(forgotPasswordSUT.execute('johndoe@mail.com'))
      .resolves.toEqual(response({
        status: false,
        message: 'An error occurred, please try later [1]'
      }))
  })

  it('Should return an error response if email sending fails', async () => {
    const { forgotPasswordSUT, EmailServiceStub } = makeSut()

    jest.spyOn(EmailServiceStub, 'sendMail').mockResolvedValueOnce(response({
      status: false,
      message: 'An error occurred while sending the email, please try again',
    }))

    await expect(forgotPasswordSUT.execute('johndoe@mail.com'))
      .resolves.toEqual(response({
        status: false,
        message: 'An error occurred while sending the email, please try again',
      }))
  })

  it('Should return an error response with "Internal server error" message if the error is unidentified', async () => {
    const { forgotPasswordSUT, EmailServiceStub } = makeSut()

    jest.spyOn(EmailServiceStub, 'sendMail').mockImplementation(() => {
      throw new Error()
    })

    await expect(forgotPasswordSUT.execute('johndoe@mail.com'))
      .resolves.toEqual(response({
      status: false,
      message: 'Internal server error'
    }))
  })

  it('Should return an success responde with status true if the email exists and the reset email is sent successfully', async () => {
    const { forgotPasswordSUT } = makeSut()

    await expect(forgotPasswordSUT.execute('johndoe@mail.com'))
      .resolves.toEqual(response({
        message: 'If the provided email is registered, a password recovery token has been sent. Please check your inbox and spam folder.',
      }))
  })
})
