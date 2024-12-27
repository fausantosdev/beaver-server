export interface ForgotPassword {
  execute(email: string): Promise<boolean>
}
