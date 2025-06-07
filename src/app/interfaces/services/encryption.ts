import { Response } from '@shared/utils/response-helper'

export interface Encryption {
  hash(text: string, salt: number): Promise<Response>
  compare(text: string, hash: string): Promise<Response>
}
