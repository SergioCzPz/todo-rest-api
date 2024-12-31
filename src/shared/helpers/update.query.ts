import type { UpdateTaskDto } from '../../task/schemas/task.schema'
import type { UpdateUserDto } from '../../user/schemas/user.schema'

export enum UpdateDto {
  USER = 'users',
  USER_CREDENTIALS = 'credentials',
  TASK = 'tasks',
  TASK_STATUS = 'task_status',
}

export interface UpdateQueryOpt {
  table: UpdateDto
  dto: UpdateTaskDto | UpdateUserDto
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
