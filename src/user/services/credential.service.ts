import type { ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import type { Credential, UpdateCredential } from '../schemas/credential.schema'
import { Table, UpdateQuery, type UpdateQueryOpt } from '../../shared/helpers/update.query'

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
}
