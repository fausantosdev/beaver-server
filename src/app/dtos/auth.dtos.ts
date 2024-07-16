type LoginDto = {
  email: string
  password: string
}

type ResetPasswordDto = {
  token: string
  email: string
  newPassword: string
}

export {
  LoginDto,
  ResetPasswordDto
}