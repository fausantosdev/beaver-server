import { SignInDto } from '@shared/dtos/auth-dtos'
import { Response } from '@shared/utils/response-helper'

interface SignIn {
  execute ({ email, password }: SignInDto): Promise<Response>
}

export { SignIn }
