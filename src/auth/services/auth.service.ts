import type { RowDataPacket, ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import type { Credential } from '../schemas/auth.schema'
import bcrypt from 'bcrypt'
import { UserService } from '../../user/services/user.service'
import type { CreateUserDto } from '../../user/schemas/user.schema'

interface Password extends RowDataPacket {
  password: string
}

export class AuthService {
  private readonly dbConnection
  private readonly noUserFound = 0
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

    if (resultSetHeaderEmail.fieldCount === this.noUserFound) return false

    const [dataPackets] = await this.dbConnection.pool.execute<Password[]>(
      'SELECT `password` FROM `credentials` WHERE `email` = ?',
      [email],
    )

    const isValid = await bcrypt.compare(password, dataPackets[this.passwordArr].password)

    return isValid
  }

  async register(user: CreateUserDto): Promise<boolean> {
    const [resultSetHeaderUser, resultSetHeaderCredential] = await this.userService.createUser(user)
    console.log(resultSetHeaderCredential)
    console.log(resultSetHeaderUser)

    return (
      resultSetHeaderUser.affectedRows === this.affectedRow &&
      resultSetHeaderCredential.affectedRows === this.affectedRow
    )
  }
}
