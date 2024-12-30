import type { UpdateTaskDto } from '../../task/schemas/task.schema'
import type { UpdateUserDto } from '../../user/schemas/user.schema'

export enum UpdateDto {
  USER = 'user',
  TASK = 'task',
}

export function UpdateQuery(table: UpdateDto, dto: UpdateUserDto | UpdateTaskDto): string {
  return (
    'UPDATE `' +
    table +
    's` SET ' +
    Object.keys(dto)
      .map(key => '`' + key + '` = ?')
      .join(', ') +
    ' WHERE `' +
    table +
    '_id` = ? LIMIT 1'
  )
}
// UPDATE `users` SET `name` = ?, `surname` = ?, `email` = ?, `password` = ?, `occupation` = ? WHERE `user_id` = ? LIMIT 1
