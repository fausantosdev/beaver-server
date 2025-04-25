import { InMemoryUserRepository } from '@data/_test/repositories/in-memory-user-repository'
import { Response } from '@interfaces/response'
import { Jwt } from '@interfaces/services/jwt'
import { response } from '@shared/utils/response-helper'
import { RefreshTokenUseCase } from '@usecases/auth/refresh-token-use-case'

const makeJwtHelper = () => {
  class JwtHelper implements Jwt {
    generateToken(payload: object): Response {
      return response({ data: 'token' })
    }

    decodeToken(token: string): Response {
      return response({
        data: {
          id: 'some-id',
          email: 'fausantosdev@gmail.com',
          role: 'user',
          iat: 1741910448,
          exp: 1741996848
        }
      })
    }
  }

  return new JwtHelper()
}

const makeSut = () => {// Factory
  const jwtHelperStub = makeJwtHelper()
  const inMemoryUserRepositoryStub = new InMemoryUserRepository()

  const refreshTokenSUT = new RefreshTokenUseCase(
    inMemoryUserRepositoryStub,
    jwtHelperStub
  )

  return {
    refreshTokenSUT,
    jwtHelperStub,
    inMemoryUserRepositoryStub
  }
}

describe('Refresh token use case', () => {
  it('Should return an error response if token is invalid', async () => {
    const { refreshTokenSUT, jwtHelperStub } = makeSut()

    jest.spyOn(jwtHelperStub, 'decodeToken')
      .mockReturnValueOnce(response({
        status: false,
        message: 'Invalid or expired token, please, log in again.'
      }))

    await expect(refreshTokenSUT.execute('invalid-token'))
      .resolves.toEqual(response({
        status: false,
        message: 'Invalid or expired token, please, log in again.'
      }))
  })

  it('Should call decodeToken with a valid token', async () => {
    const { refreshTokenSUT, jwtHelperStub } = makeSut()

    const jwtHelperStubSpy = jest.spyOn(jwtHelperStub, 'decodeToken')

    await refreshTokenSUT.execute('valid-token')

    expect(jwtHelperStubSpy)
      .toHaveBeenCalledWith('valid-token')
  })

  it('Should return an error response if the user of the decoded token is not found', async () => {
    const { refreshTokenSUT, inMemoryUserRepositoryStub } = makeSut()

    jest.spyOn(inMemoryUserRepositoryStub, 'findOne').mockResolvedValueOnce(null)

    await expect(refreshTokenSUT.execute('invalid-token'))
      .resolves.toEqual(response({
        status: false,
        message: 'Invalid token, please log in again'
      }))
  })

  it('Should return error response if token is not generated', async () => {
    const { refreshTokenSUT, jwtHelperStub } = makeSut()

    jest.spyOn(jwtHelperStub, 'generateToken')
      .mockReturnValueOnce(response({
        status: false,
        message: 'Error generating token, please try again'
      }))

    await expect(refreshTokenSUT.execute('invalid-token'))
      .resolves.toEqual(response({
        status: false,
        message: 'Error generating token, please try again'
      }))
  })

  it('Should call JwtHelper with correct params', async () => {
    const { refreshTokenSUT, jwtHelperStub } = makeSut()

    const jwtGenerateTokenSpy = jest.spyOn(jwtHelperStub, 'generateToken')

    await refreshTokenSUT.execute('valid-token')

    expect(jwtGenerateTokenSpy)
      .toHaveBeenCalledWith({
        id: 'some-id',
        email: 'johndoe@mail.com',
        role: 'user'
      })
  })

  it('Should return an error response with "Internal server error" message if the error is unidentified', async () => {
    const { refreshTokenSUT, jwtHelperStub } = makeSut()

    jest.spyOn(jwtHelperStub, 'generateToken').mockImplementation(() => {
      throw new Error()
    })

    await expect(refreshTokenSUT.execute('invalid-token'))
      .resolves.toEqual(response({
        status: false,
        message: 'Internal server error'
      }))
  })

  it('Should return an new token if token is valid', async () => {
    const { refreshTokenSUT } = makeSut()

    await expect(refreshTokenSUT.execute('valid-token'))
      .resolves.toEqual(response({
        data: 'token',
      }))
  })
})
