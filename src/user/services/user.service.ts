import type { ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import { v4 as uuidv4 } from 'uuid'
import { bcryptPassword } from '../../shared/helpers/encrypt.password'
import { Table, UpdateQuery, type UpdateQueryOpt } from '../../shared/helpers/update.query'
import type { UpdateUser, User, UserDb } from '../schemas/user.schema'
import type { UserCredential } from '../schemas/user.credential.schema'

export class UserService {
  private readonly dbConnection
  private readonly firstElement = 0

  constructor() {
    this.dbConnection = pool
  }

  async getUsers(): Promise<UserDb[]> {
    const [users] = await this.dbConnection.pool.execute<UserDb[]>('SELECT * FROM `users`')
    return users
  }

  async getUserById(id: string): Promise<User> {
    const values = [id]
    const [user] = await this.dbConnection.pool.execute<UserDb[]>('SELECT * FROM `users` WHERE `user_id` = ?', values)
    return user[this.firstElement]
  }

  async getUserIdByEmail(emailUser: string): Promise<string> {
    const [userId] = await this.dbConnection.pool.execute<UserDb[]>(
      'SELECT `password` FROM `credentials` WHERE `email` = ?',
      [emailUser],
    )

    return userId[this.firstElement].id
  }

  async createUser(user: UserCredential): Promise<ResultSetHeader[]> {
    const { name, surname, email, password, occupation } = user
    const id = uuidv4()
    const userValues = [id, name, surname, occupation]

    const [resultSetHeaderUser] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `users`(`user_id`, `name`, `surname`, `occupation`) VALUES (?, ?, ?, ?)',
      userValues,
    )

    const encryptedPassword = await bcryptPassword(password)
    const credentialValues = [email, id, encryptedPassword]

    const [resultSetHeaderCredential] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `credentials`(`email`, `user_id`, `password`) VALUES(?, ?, ?)',
      credentialValues,
    )

    return [resultSetHeaderUser, resultSetHeaderCredential]
  }

  async updateUser(id: string, user: UpdateUser): Promise<ResultSetHeader> {
    const updateOpt: UpdateQueryOpt = {
      table: Table.USER,
      dto: user,
      id: 'user_id',
    }
    const query = UpdateQuery(updateOpt)
    const values = [...Object.values(user), id]

    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(query, values)
    return resultSetHeader
  }

  async deleteUser(id: string): Promise<ResultSetHeader> {
    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'DELETE FROM `users` WHERE `user_id` = ? LIMIT 1',
      [id],
    )

    return resultSetHeader
  }

  /**
   *
   * @param id from user
   */
  // async getTasks(id: string): Promise<Task[]> {
  //   const [tasks] = await this.dbConnection.pool.execute<Task[]>(
  //     'SELECT * FROM `tasks` t INNER JOIN `task_status` ts ON t.task_id = ts.task_id WHERE t.user_id = ?',
  //     [id],
  //   )

  //   return tasks
  // }
}
