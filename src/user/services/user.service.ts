import pool from '../../data/db'
import type { User } from '../../shared/constants/interfaces/user.interface'

export class UserService {
  private readonly dbConnection

  constructor() {
    this.dbConnection = pool
  }

  async getUsers(): Promise<User[]> {
    const [users] = await this.dbConnection.pool.execute<User[]>('SELECT * FROM `users`')
    return users
  }
}
