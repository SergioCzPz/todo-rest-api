import type { ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import type { User } from '../../data/entities/user.entity'
import { v4 as uuidv4 } from 'uuid'
import type { CreateUserDto, UpdateUserDto } from '../schemas/user.schema'
import { bcryptPassword } from '../../shared/helpers/encrypt.password'
import { userUpdateQuery } from '../../shared/helpers/update.query'

export class UserService {
  private readonly dbConnection
  private readonly firstElement = 0

  constructor() {
    this.dbConnection = pool
  }

  async getUsers(): Promise<User[]> {
    const [users] = await this.dbConnection.pool.execute<User[]>('SELECT * FROM `users`')
    return users
  }

  async getUser(id: string): Promise<User> {
    const values = [id]
    const [user] = await this.dbConnection.pool.execute<User[]>('SELECT * FROM `users` WHERE `user_id` = ?', values)
    return user[this.firstElement]
  }

  async createUser(user: CreateUserDto): Promise<ResultSetHeader[]> {
    const { name, surname, email, password, occupation } = user
    const id = uuidv4()
    const encryptedPassword = await bcryptPassword(password)
    const userValues = [id, name, surname, occupation]
    const credentialValues = [email, id, encryptedPassword]

    const [resultSetHeaderUser] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `users`(`user_id`, `name`, `surname`, `occupation`) VALUES (?, ?, ?, ?)',
      userValues,
    )

    const [resultSetHeaderCredential] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `credentials`(`email`, `user_id`, `password`) VALUES(?, ?, ?)',
      credentialValues,
    )

    return [resultSetHeaderUser, resultSetHeaderCredential]
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<ResultSetHeader> {
    const query = userUpdateQuery(user)
    const values = [...Object.values(user), id]

    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(query, values)
    return resultSetHeader
  }
}
