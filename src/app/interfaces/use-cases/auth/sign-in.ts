import { SignInDto } from '@shared/dtos/auth-dtos'
import { Response } from '@shared/types/response'

export interface SignIn {
  execute({ email, password }: SignInDto): Promise<Response>
}
