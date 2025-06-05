import { ResetPasswordUseCase } from '@app/use-cases/auth/reset-password-use-case'
import { InMemoryUserRepository } from '@infra/data/_test/repositories/in-memory-user-repository'
import { Encryption } from '@interfaces/services/encryption'
import { Response } from '@shared/types/response'
import { response } from '@shared/utils/response-helper'

const makeEcriptionService = () => {
  class EncryptionServiceStub implements Encryption {
    hash(text: string, salt: number): Promise<Response> {
      return Promise.resolve(response({
        data: 'hashedText'
      }))
    }

    compare(text: string, hash: string): Promise<Response> {
      return Promise.resolve(response({
        status: true
      }))
    }
  }

  return new EncryptionServiceStub()
}

const makeSut = () => {
  const inMemoryUserRepositoryStub = new InMemoryUserRepository()
  const encryptionServiceStub = makeEcriptionService()

  const resetPasswordSUT = new ResetPasswordUseCase(
    inMemoryUserRepositoryStub,
    encryptionServiceStub
  )

  return {
    resetPasswordSUT,
    inMemoryUserRepositoryStub,
    encryptionServiceStub
  }
}

describe('Refresh token use case', () => {
  it('Should return an error response if the email is not found', async () => {
    const { resetPasswordSUT } = makeSut()

    await expect(resetPasswordSUT.execute({
      email: 'johndoe2@mail.com',
      token: 'some-token',
      newPassword: 'new-password'
    }))
    .resolves
    .toEqual(response({
      status: false,
      message: 'E-mail not found',
    }))
  })

  it('Should return an error response if the password reset token is invalid', async () => {
    const { resetPasswordSUT } = makeSut()

    await expect(resetPasswordSUT.execute({
      email: 'johndoe@mail.com',
      token: 'invalid-token',
      newPassword: 'new-password'
    }))
    .resolves
    .toEqual(response({
      status: false,
      message: 'Invalid password recovery token'
    }))
  })

  it('Should return an error response if the password reset token is expired', async () => {
    const { resetPasswordSUT, inMemoryUserRepositoryStub } = makeSut()

    const current = new Date()

    jest.spyOn(inMemoryUserRepositoryStub, 'findOne').mockResolvedValue({
      id: 'some-id',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: 'some-password',
      role: 'user',
      password_reset_token: 'some-token',
      password_reset_expires: new Date(current.getTime() - 86400000),
      created_at: new Date(),
      updated_at: new Date()
    })

    await expect(resetPasswordSUT.execute({
      email: 'johndoe@mail.com',
      token: 'some-token',
      newPassword: 'new-password'
    }))
    .resolves
    .toEqual(response({
      status: false,
      message: 'Token expired, request a new one',
    }))
  })

  it('Should return an error response if the record is not updated', async () => {
    const { resetPasswordSUT, inMemoryUserRepositoryStub } = makeSut()

    const current = new Date()

    jest.spyOn(inMemoryUserRepositoryStub, 'findOne').mockResolvedValue({
      id: 'some-id',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: 'some-password',
      role: 'user',
      password_reset_token: 'some-token',
      password_reset_expires: new Date(current.getTime() + 86400000),
      created_at: new Date(),
      updated_at: new Date()
    })

    jest.spyOn(inMemoryUserRepositoryStub, 'update').mockResolvedValue(null)

    await expect(resetPasswordSUT.execute({
      email: 'johndoe@mail.com',
      token: 'some-token',
      newPassword: 'new-password'
    }))
    .resolves
    .toEqual(response({
      status: false,
      message: 'Error while updating password, try again later',
    }))
  })

  it('Should call EncriptionHelper/hash with the correct parameters', async () => {
    const { resetPasswordSUT, inMemoryUserRepositoryStub, encryptionServiceStub } = makeSut()

    const current = new Date()

    jest.spyOn(inMemoryUserRepositoryStub, 'findOne').mockResolvedValue({
      id: 'some-id',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: 'some-password',
      role: 'user',
      password_reset_token: 'some-token',
      password_reset_expires: new Date(current.getTime() + 86400000),
      created_at: new Date(),
      updated_at: new Date()
    })

    const encryptionServiceSpy = jest.spyOn(encryptionServiceStub, 'hash')

    await resetPasswordSUT.execute({
      email: 'johndoe@mail.com',
      token: 'some-token',
      newPassword: 'new-password'
    })

    expect(encryptionServiceSpy)
      .toHaveBeenCalledWith('new-password', 8)
  })

  it('Should return an error response with "Internal server error" message if the error is unidentified', async () => {
    const { encryptionServiceStub, inMemoryUserRepositoryStub, resetPasswordSUT } = makeSut()

    const current = new Date()

    jest.spyOn(inMemoryUserRepositoryStub, 'findOne').mockResolvedValue({
      id: 'some-id',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: 'some-password',
      role: 'user',
      password_reset_token: 'some-token',
      password_reset_expires: new Date(current.getTime() + 86400000),
      created_at: new Date(),
      updated_at: new Date()
    })

    jest.spyOn(encryptionServiceStub, 'hash').mockImplementation(() => {
      throw new Error()
    })

    await expect(resetPasswordSUT.execute({
      email: 'johndoe@mail.com',
      token: 'some-token',
      newPassword: 'new-password'
    }))
    .resolves.toEqual(response({
      status: false,
      message: 'Internal server error'
    }))
  })

  it('Should return success response if password updated', async () => {
    const { resetPasswordSUT, inMemoryUserRepositoryStub } = makeSut()

    const current = new Date()

    jest.spyOn(inMemoryUserRepositoryStub, 'findOne').mockResolvedValue({
      id: 'some-id',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: 'some-password',
      role: 'user',
      password_reset_token: 'some-token',
      password_reset_expires: new Date(current.getTime() + 86400000),
      created_at: new Date(),
      updated_at: new Date()
    })

    await expect(resetPasswordSUT.execute({
      email: 'johndoe@mail.com',
      token: 'some-token',
      newPassword: 'new-password'
    }))
    .resolves
    .toEqual(response({}))
  })
})
