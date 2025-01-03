import type { RowDataPacket, ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import type { Credential } from '../schemas/auth.schema'
import bcrypt from 'bcrypt'
import { UserService } from '../../user/services/user.service'
import type { UserCredential } from '../../user/schemas/user.credential.schema'

interface Password extends RowDataPacket {
  password: string
}

export class AuthService {
  private readonly dbConnection
  private readonly noFieldCount = 0
  private readonly passwordArr = 0
  private readonly affectedRow = 1

  constructor(private readonly userService: UserService = new UserService()) {
    this.dbConnection = pool
  }

  async authenticate(credential: Credential): Promise<boolean> {
    const { email, password } = credential
    const [resultSetHeaderEmail] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'SELECT `email` FROM `credentials` WHERE `email` = ?',
      [email],
    )

    if (resultSetHeaderEmail.fieldCount === this.noFieldCount) return false

    const [passwordDb] = await this.dbConnection.pool.execute<Password[]>(
      'SELECT `password` FROM `credentials` WHERE `email` = ?',
      [email],
    )

    const isValid = await bcrypt.compare(password, passwordDb[this.passwordArr].password)

    return isValid
  }

  async register(user: UserCredential): Promise<boolean> {
    const [resultSetHeaderUser, resultSetHeaderCredential] = await this.userService.createUser(user)

    return (
      resultSetHeaderUser.affectedRows === this.affectedRow &&
      resultSetHeaderCredential.affectedRows === this.affectedRow
    )
  }
}
