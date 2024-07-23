type LoginDto = {
  email: string
  password: string
}

type ResetPasswordDto = {
  token: string
  email: string
  newPassword: string
}

type JwtPayloadDto = {
  id: string
  email: string
  role: 'user' | 'admin'
  iat: number
  exp: number
}

export {
  LoginDto,
  ResetPasswordDto,
  JwtPayloadDto
}