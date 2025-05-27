import { Response } from '@interfaces/response'
import { SignInDto } from '@shared/dtos/auth-dtos'

export interface SignIn {
  execute({ email, password }: SignInDto): Promise<Response>
}
