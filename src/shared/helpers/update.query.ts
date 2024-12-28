import type { UpdateUserDto } from '../../user/schemas/user.schema'

export function userUpdateQuery(user: UpdateUserDto): string {
  return (
    'UPDATE `users` SET ' +
    Object.keys(user)
      .map(key => '`' + key + '` = ?')
      .join(', ') +
    ' WHERE `user_id` = ? LIMIT 1'
  )
}
// UPDATE `users` SET `name` = ?, `surname` = ?, `email` = ?, `password` = ?, `occupation` = ? WHERE `user_id` = ? LIMIT 1
