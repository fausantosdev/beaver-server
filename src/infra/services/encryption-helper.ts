import { Response } from '@protocols/response'
import { Encryption } from '@protocols/services/encryption'
import { response } from '@utils/response-helper'
import bcrypt from 'bcrypt'

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

      if (!isMatch) return response({ status: false})

      return response({ status: true, data: isMatch })
    } catch (error) {
      return response({ status: false, message: 'Erro ao comparar hash' })
    }
  }
}

export { EncryptionHelper }
