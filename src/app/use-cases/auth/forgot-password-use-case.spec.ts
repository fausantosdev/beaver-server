import { QueueManager } from '@app/interfaces/queue/queue-manager'
import { ForgotPasswordUseCase } from '@app/use-cases/auth/forgot-password-use-case'
import { InMemoryUserRepository } from '@infra/data/_test/repositories/in-memory-user-repository'
import { Response, response } from '@shared/utils/response-helper'

const makeQueueManager = () => {
  class QueueManagerStub implements QueueManager {
    init(): void {}

    async add(queueKey: string, data: object): Promise<Response> {
      return response({
        status: true,
        message: 'Job added to queue successfully',
      })
    }

    processQueues(): void {}

    handleFailure(queueKey: string, job: any, error: Error): void {}

    handleSuccess(queueKey: string, job: any): void {}
  }

  return new QueueManagerStub()
}

const makeSut = () => {
  const QueueManagerStub = makeQueueManager()
  const inMemoryUserRepositoryStub = new InMemoryUserRepository()

  const forgotPasswordSUT = new ForgotPasswordUseCase(
    inMemoryUserRepositoryStub,
    QueueManagerStub
  )

  return {
    forgotPasswordSUT,
    inMemoryUserRepositoryStub,
    QueueManagerStub
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

  it('Should return an error response if the queue manager fails to add the job', async () => {
    const { forgotPasswordSUT, QueueManagerStub } = makeSut()

    jest.spyOn(QueueManagerStub, 'add').mockResolvedValueOnce(response({
      status: false,
      message: 'Failed to add job to queue'
    }))

    await expect(forgotPasswordSUT.execute('johndoe@mail.com'))
      .resolves.toEqual(response({
        status: false,
        message: 'Failed to add job to queue'
      }))
  })

  it('Should return an error response with "Internal server error" message if the error is unidentified', async () => {
    const { forgotPasswordSUT, inMemoryUserRepositoryStub } = makeSut()

    jest.spyOn(inMemoryUserRepositoryStub, 'findOne').mockRejectedValueOnce(new Error())

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
