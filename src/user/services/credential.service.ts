import pool from '../../data/db'
import { Table, UpdateQuery, type UpdateQueryOpt } from '../../shared/helpers/update.query'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { Credential, UpdateCredential } from '../schemas/credential.schema'

interface Email extends RowDataPacket {
  email: string
}

interface Password extends RowDataPacket {
  password: string
}

export class CredentialService {
  private readonly dbConnection
  private readonly firstElArr = 0

  constructor() {
    this.dbConnection = pool
  }

  async getCredentialById(id: string): Promise<Credential> {
    const values = [id]
    const [credential] = await this.dbConnection.pool.execute<Credential[]>(
      'SELECT `email`, `password` FROM `credentials` WHERE `user_id` = ?',
      values,
    )
    return credential[this.firstElArr]
  }

  async updateCredential(id: string, credential: UpdateCredential): Promise<ResultSetHeader> {
    const queryOpt: UpdateQueryOpt = {
      table: Table.USER_CREDENTIALS,
      dto: credential,
      id: 'user_id',
    }
    const values = [...Object.values(credential), id]
    const query = UpdateQuery(queryOpt)

    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(query, values)
    return resultSetHeader
  }

  async getEmailByEmail(email: string): Promise<string | undefined> {
    const values = [email]
    const [emailDb] = await this.dbConnection.pool.execute<Email[]>(
      'SELECT `email` FROM `credentials` WHERE `email` = ?',
      values,
    )
    return emailDb[this.firstElArr].email
  }

  async getPasswordByEmail(email: string): Promise<string> {
    const values = [email]
    const [PassDb] = await this.dbConnection.pool.execute<Password[]>(
      'SELECT `password` FROM `credentials` WHERE `email` = ?',
      values,
    )
    return PassDb[this.firstElArr].password
  }
}
