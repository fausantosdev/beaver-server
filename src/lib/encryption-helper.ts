import { Encryption } from '@protocols/encryption'
import bcrypt from 'bcrypt'

class EncryptionHelper implements Encryption {
  public async hash (text: string, salt: number): Promise<string> {
    return bcrypt.hash(text, salt)
  }

  public async compare (text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash)
  }
}

export { EncryptionHelper }
