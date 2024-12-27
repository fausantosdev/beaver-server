import { SignInDto } from '@dtos/auth-dtos'

export interface SignIn {
  execute({ email, password }: SignInDto): Promise<{ jwt: string }>
}
