import { InMemoryUserRepository } from '@data/_test/repositories/in-memory-user-repository'
import { Response } from '@interfaces/response'
import { Encryption } from '@interfaces/services/encryption'
import { Jwt } from '@interfaces/services/jwt'
import { SignInUseCase } from '@usecases/auth/sign-in-use-case'
import { response } from '@utils/response-helper'

const makeEncrypterHelper = () => {
  class EncryptionHelperStub implements Encryption {
    hash(text: string, salt: number): Promise<Response> {
      return new Promise(resolve => resolve(response({ data: 'hashedText' })))
    }
    compare(text: string, hash: string): Promise<Response> {
      return new Promise(resolve => resolve(response({ data: true })))
    }
  }

  return new EncryptionHelperStub()
}

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
  const encryptionHelperStub = makeEncrypterHelper()
  const jwtHelperStub = makeJwtHelper()

  const signInSUT = new SignInUseCase(
    new InMemoryUserRepository(),
    encryptionHelperStub,
    jwtHelperStub
  )

  return {
    signInSUT,
    encryptionHelperStub,
    jwtHelperStub
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
    const { signInSUT, encryptionHelperStub } = makeSut()

    jest.spyOn(encryptionHelperStub, 'compare').mockResolvedValueOnce(response({
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

  it('Should call JwtHelper with the correct parameters', async () => {
    const { signInSUT, jwtHelperStub } = makeSut()

    const jwtGenerateTokenSpy = jest.spyOn(jwtHelperStub, 'generateToken')

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
    const { signInSUT, jwtHelperStub } = makeSut()

    jest.spyOn(jwtHelperStub, 'generateToken')
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
    const { signInSUT, jwtHelperStub } = makeSut()

    jest.spyOn(jwtHelperStub, 'generateToken').mockImplementation(() => {
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
    const { signInSUT, encryptionHelperStub } = makeSut()

    const encryptionHelperSpy = jest.spyOn(encryptionHelperStub, 'compare')

    await signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'some-password'
    })

    expect(encryptionHelperSpy)
      .toHaveBeenCalledWith('some-password', 'some-password')
  })

  it('Should call JwtHelper/generateToken with the correct parameters', async () => {
    const { jwtHelperStub, signInSUT } = makeSut()

    const jwtHelperSpy = jest.spyOn(jwtHelperStub, 'generateToken')

    await signInSUT.execute({
      email: 'johndoe@mail.com',
      password: 'some-password'
    })

    expect(jwtHelperSpy)
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
