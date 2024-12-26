import type { RowDataPacket } from 'mysql2'

export interface User extends RowDataPacket {
  id: string
  name: string
  surname: string
  occupation: string
}
