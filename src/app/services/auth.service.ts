import cripto from 'node:crypto'

import { compare, hash } from '@lib/bcrypt'
import { generateToken, decodeToken } from '@lib/jwt'
import { Nodemailer } from '@lib/nodemailer'

import { UserRepository } from '@repositories/user.repository'

import { JwtPayloadDto, LoginDto, ResetPasswordDto } from '@dtos/auth.dtos'

class AuthService {
  private userRepository: UserRepository
  private mail: Nodemailer

  constructor() {
    this.userRepository = new UserRepository()
    this.mail = new Nodemailer()
  }

  public signIn = async ({ email, password }: LoginDto): Promise<string> => {
    const user = await this.userRepository.findOne({ email })

    if ( !user || (!(user && (await compare(password, user.password_hash)))) ) throw new Error('Authentication failed, check your credentials')

    const jwt = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return jwt
  }

  public refreshToken = async (token: string): Promise<string> => {
    const { id } = decodeToken(token) as JwtPayloadDto
    
    const userExists = await this.userRepository.findOne({ id })

    if (!userExists) throw new Error('Invalid token, please log in again')

    const { email, role } = userExists

    const newToken = generateToken({
      id,
      email,
      role
    })

    return newToken
  }

  public forgotPassword = async (email: string): Promise<boolean> => {
    const userExists = await this.userRepository.findOne({ email })

    if(!userExists) throw new Error('E-mail not found')

    const token = cripto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    const updated = await this.userRepository.update(
      { id: userExists?.id },
      { password_reset_token: token, password_reset_expires: now }
    )
    
    if (updated.id) {
      const emailSent = await this.mail.sendMail({
        to: updated.email,
        subject: '[Beaver SaaS] - Password recovery',
        text: `Use this token to recover your password: ${token}\nIf you didn't request this recovery, just disregard this email, your data is safe.`
      })
  
      if (!emailSent) throw new Error('An error occurred, please try later [2]')
      
      return true  
    } else {
      throw new Error('An error occurred, please try later [1]')
    }
  }

  public resetPassword = async ({ token, email, newPassword }: ResetPasswordDto) => {
    const userExists = await this.userRepository.findOne({ email })

    if (!userExists) throw new Error('E-mail not found')

    if(token !== userExists.password_reset_token) throw new Error('Invalid password recovery token')

    if (userExists.password_reset_expires && (new Date() > userExists.password_reset_expires)) throw new Error('Token expired, request a new one')
      
    const updated = await this.userRepository.update({ 
      id: userExists.id 
    }, {
      password_hash: await hash(newPassword, 8),
      password_reset_token: null,
      password_reset_expires: null
    })

    if (!updated) throw new Error('An error occurred while updating your password, please try again')
      
    return true
  }
}

export { AuthService }