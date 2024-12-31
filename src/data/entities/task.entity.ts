import type { RowDataPacket } from 'mysql2'

export interface Task extends RowDataPacket {
  id: string
  userId: string
  task: string
  status: number
  startDate: string
  finishDate?: string
}
