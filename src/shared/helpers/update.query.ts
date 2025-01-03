import type { UpdateTask } from '../../task/schemas/task.schema'
import type { UpdateCredential } from '../../user/schemas/credential.schema'
import type { UpdateUser } from '../../user/schemas/user.schema'

export enum Table {
  USER = 'users',
  USER_CREDENTIALS = 'credentials',
  TASK = 'tasks',
  TASK_STATUS = 'task_status',
}

export interface UpdateQueryOpt {
  table: Table
  dto: UpdateTask | UpdateUser | UpdateCredential
  id: string
}

export function UpdateQuery(options: UpdateQueryOpt): string {
  return (
    'UPDATE `' +
    options.table +
    '` SET ' +
    Object.keys(options.dto)
      .map(key => '`' + key + '` = ?')
      .join(', ') +
    ' WHERE `' +
    options.id +
    '` = ? LIMIT 1'
  )
}
// UPDATE `users` SET `name` = ?, `surname` = ?, `email` = ?, `password` = ?, `occupation` = ? WHERE `user_id` = ? LIMIT 1
