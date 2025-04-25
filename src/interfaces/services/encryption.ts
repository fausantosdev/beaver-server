import { Response } from '@interfaces/response'

export interface Encryption {
  hash(text: string, salt: number): Promise<Response>
  compare(text: string, hash: string): Promise<Response>
}
