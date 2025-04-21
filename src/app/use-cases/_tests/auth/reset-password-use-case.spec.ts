
import { InMemoryUserRepository } from '@data/_test/repositories/in-memory-user-repository'
import { EncryptionHelper } from '@lib/encryption-helper'
import { Response } from '@protocols/response'
import { Encryption } from '@protocols/services/encryption'
import { ResetPasswordUseCase } from '@usecases/auth/reset-password-use-case'
import { response } from '@utils/response-helper'

const makeEcriptionHelper = () => {
  class EncryptionHelper implements Encryption {
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

  return new EncryptionHelper()
}

const makeSut = () => {
  const inMemoryUserRepositoryStub = new InMemoryUserRepository()
  const encryptionHelperStub = makeEcriptionHelper()

  const resetPasswordSUT = new ResetPasswordUseCase(
    inMemoryUserRepositoryStub,
    encryptionHelperStub
  )

  return {
    resetPasswordSUT,
    inMemoryUserRepositoryStub,
    encryptionHelperStub
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
    const { resetPasswordSUT,  } = makeSut()

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
    const { resetPasswordSUT, inMemoryUserRepositoryStub, encryptionHelperStub } = makeSut()

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

    const encryptionHelperSpy = jest.spyOn(encryptionHelperStub, 'hash')

    await resetPasswordSUT.execute({
      email: 'johndoe@mail.com',
      token: 'some-token',
      newPassword: 'new-password'
    })

    expect(encryptionHelperSpy)
      .toHaveBeenCalledWith('new-password', 8)
  })

  it('Should return an error response with "Internal server error" message if the error is unidentified', async () => {
    const { encryptionHelperStub, inMemoryUserRepositoryStub, resetPasswordSUT } = makeSut()

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

    jest.spyOn(encryptionHelperStub, 'hash').mockImplementation(() => {
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
