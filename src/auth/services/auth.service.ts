import type { RowDataPacket, ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import type { Credential } from '../schemas/auth.schema'
import bcrypt from 'bcrypt'

interface Password extends RowDataPacket {
  password: string
}

export class AuthService {
  private readonly dbConnection
  private readonly noUserFound = 0
  private readonly passwordArr = 0

  constructor() {
    this.dbConnection = pool
  }

  async login(credential: Credential): Promise<boolean> {
    const { email, password } = credential
    const [resultSetHeaderEmail] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'SELECT `email` FROM `credentials` WHERE `email` = ?',
      [email],
    )

    if (resultSetHeaderEmail.fieldCount === this.noUserFound) return false

    const [dataPackets] = await this.dbConnection.pool.execute<Password[]>(
      'SELECT `password` FROM `credentials` WHERE `email` = ?',
      [email],
    )

    console.log(dataPackets)

    const isValid = await bcrypt.compare(password, dataPackets[this.passwordArr].password)
    return isValid
  }
}
