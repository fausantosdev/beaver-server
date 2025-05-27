import { SignInDto } from '@app/dtos/auth-dtos'
import { Response } from '@interfaces/response'

export interface SignIn {
  execute({ email, password }: SignInDto): Promise<Response>
}
