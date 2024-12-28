import bcrypt from 'bcrypt'

const saltRounds = 10

export async function bcryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds)
}
