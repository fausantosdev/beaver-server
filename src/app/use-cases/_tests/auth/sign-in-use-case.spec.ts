import { SignInUseCase } from '@app/use-cases/auth/sign-in-use-case'
import { InMemoryUserRepository } from '@infra/data/_test/repositories/in-memory-user-repository'
import { Encryption } from '@interfaces/services/encryption'
import { Jwt } from '@interfaces/services/jwt'
import { Response } from '@shared/types/response'
import { response } from '@shared/utils/response-helper'

const makeEncrypterService = () => {
  class EncryptionServiceStub implements Encryption {
    hash(text: string, salt: number): Promise<Response> {
      return new Promise(resolve => resolve(response({ data: 'hashedText' })))
    }
    compare(text: string, hash: string): Promise<Response> {
      return new Promise(resolve => resolve(response({ data: true })))
    }
  }

  return new EncryptionServiceStub()
}

const makeJwtService = () => {
  class JwtServiceStub implements Jwt {
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

  return new JwtServiceStub()
}

const makeSut = () => {// Factory
  const encryptionServiceStub = makeEncrypterService()
  const jwtServiceStub = makeJwtService()

  const signInSUT = new SignInUseCase(
    new InMemoryUserRepository(),
    encryptionServiceStub,
    jwtServiceStub
  )

  return {
    signInSUT,
    encryptionServiceStub,
    jwtServiceStub
  }
}

describe('Sign in use case', () => {
  it('Should return an error response if the provided email does not exist', async () => {
    const { signInSUT } = makeSut()

    await expect(signInSUT.execute({
      email: 'johndoe2@mail.com',
      password: 'some-password'
    })).resolves.toEqual(response({
      status: false,
      message: 'Authentication failed, check your credentials'
    }))
  })

  it('Should return an error response if the provided password is incorrect', async () => {
    const { signInSUT, encryptionServiceStub } = makeSut()

    jest.spyOn(encryptionServiceStub, 'compare').mockResolvedValueOnce(response({
      status: false
    }))

    await expect(signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'another-password'
    })).resolves.toEqual(response({
      status: false,
      message: 'Authentication failed, check your credentials'
    }))
  })

  it('Should call JwtService with the correct parameters', async () => {
    const { signInSUT, jwtServiceStub } = makeSut()

    const jwtGenerateTokenSpy = jest.spyOn(jwtServiceStub, 'generateToken')

    await signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'some-password'
    })

    expect(jwtGenerateTokenSpy)
      .toHaveBeenCalledWith({
        id: 'some-id',
        email: 'johndoe@mail.com',
        role: 'user'
      })
  })

  it('Should return an error response if the token is not generated', async () => {
    const { signInSUT, jwtServiceStub } = makeSut()

    jest.spyOn(jwtServiceStub, 'generateToken')
      .mockReturnValueOnce(response({
        status: false,
        message: 'Error generating token, please try again'
      }))

    await expect(signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'another-password'
    })).resolves.toEqual(response({
      status: false,
      message: 'Error generating token, please try again'
    }))
  })

  it('Should return an error response with "Internal server error" message if the error is unidentified', async () => {
    const { signInSUT, jwtServiceStub } = makeSut()

    jest.spyOn(jwtServiceStub, 'generateToken').mockImplementation(() => {
      throw new Error()
    })

    await expect(signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'another-password'
    })).resolves.toEqual(response({
      status: false,
      message: 'Internal server error'
    }))
  })

  it('Should call EncriptionHelper/compare with the correct parameters', async () => {
    const { signInSUT, encryptionServiceStub } = makeSut()

    const encryptionHelperSpy = jest.spyOn(encryptionServiceStub, 'compare')

    await signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'some-password'
    })

    expect(encryptionHelperSpy)
      .toHaveBeenCalledWith('some-password', 'some-password')
  })

  it('Should call JwtService/generateToken with the correct parameters', async () => {
    const { jwtServiceStub, signInSUT } = makeSut()

    const JwtServiceSpy = jest.spyOn(jwtServiceStub, 'generateToken')

    await signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'some-password'
    })

    expect(JwtServiceSpy)
      .toHaveBeenCalledWith({
        id: 'some-id',
        email: 'johndoe@mail.com',
        role: 'user'
      })
  })

  it('Should return a JWT token if authentication succeeds with valid credentials', async () => {
    const { signInSUT } = makeSut()

    await expect(signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'some-password'
    })).resolves.toEqual(response({
      data: 'token'
    }))
  })
})
