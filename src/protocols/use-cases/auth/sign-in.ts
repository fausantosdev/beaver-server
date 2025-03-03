import { SignInDto } from '@dtos/auth-dtos'
import { Response } from '@protocols/response'

export interface SignIn {
  execute({ email, password }: SignInDto): Promise<Response>
}
