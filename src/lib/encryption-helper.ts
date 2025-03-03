import { Encryption } from '@protocols/encryption'
import { Response } from '@protocols/response'
import bcrypt from 'bcrypt'
import { response } from 'src/utils/response-helper'

class EncryptionHelper implements Encryption {
  public async hash(text: string, salt: number): Promise<Response> {
    try {
      const hashedText = await bcrypt.hash(text, salt)
      return response({ status: true, data: hashedText })
    } catch (error) {
      return response({ status: false, message: 'Erro ao gerar hash' })
    }
  }

  public async compare(text: string, hash: string): Promise<Response> {
    try {
      const isMatch = await bcrypt.compare(text, hash)
      return response({ status: true, data: isMatch })
    } catch (error) {
      return response({ status: false, message: 'Erro ao comparar hash' })
    }
  }
}

export { EncryptionHelper }
