import mysql from 'mysql2/promise'
import { dbPoolConnectionOptions } from '../config/db.config'

class Database {
  public connection
  public pool!: mysql.PoolConnection

  constructor() {
    this.connection = mysql.createPool(dbPoolConnectionOptions)
  }

  public async getConnection(): Promise<void> {
    this.pool = await this.connection.getConnection()
  }
}

const pool = new Database()
pool
  .getConnection()
  .then(value => {
    console.log('DB CONNECTED')
  })
  .catch((err: unknown) => {
    console.log('ERR DB CONNECTION', err)
  })

export default pool
