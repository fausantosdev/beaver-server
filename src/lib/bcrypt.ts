import bcrypt from 'bcrypt'

const hash = async (text: string, salt: number): Promise<string> => {
  return bcrypt.hash(text, salt)
}

const compare = async (text: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(text, hash)
}

export {
  hash,
  compare
}