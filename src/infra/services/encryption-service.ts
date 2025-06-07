import { Encryption } from '@app/interfaces/services/encryption'
import { response } from '@shared/utils/response-helper'
import bcrypt from 'bcrypt'

class EncryptionService implements Encryption {
  public async hash(text: string, salt: number) {
    try {
      const hashedText = await bcrypt.hash(text, salt)
      return response({ status: true, data: hashedText })
    } catch (error) {
      return response({ status: false, message: 'Erro ao gerar hash' })
    }
  }

  public async compare(text: string, hash: string) {
    try {
      const isMatch = await bcrypt.compare(text, hash)

      if (!isMatch) return response({ status: false})

      return response({ status: true, data: isMatch })
    } catch (error) {
      return response({ status: false, message: 'Erro ao comparar hash' })
    }
  }
}

export { EncryptionService }
