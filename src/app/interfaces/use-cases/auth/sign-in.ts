import { SignInDto } from '@interfaces/dtos/auth-dtos'
import { Response } from '@interfaces/response'

export interface SignIn {
  execute({ email, password }: SignInDto): Promise<Response>
}
