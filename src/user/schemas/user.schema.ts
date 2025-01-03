import type { RowDataPacket } from 'mysql2'
import { z } from 'zod'

const minStringLength = 1

export const UserSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim().min(minStringLength, 'Name cannot be empty'),
  surname: z.string({ required_error: 'Surname is required' }).trim().min(minStringLength, 'Surname cannot be empty'),
  occupation: z
    .string({ required_error: 'Occupation is required' })
    .trim()
    .min(minStringLength, 'Occupation cannot be empty'),
})

const HasID = z.object({ id: z.string() })
const UserWithId = UserSchema.merge(HasID) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add user id

export type CreateUser = z.infer<typeof UserSchema>

export type UserDb = z.infer<typeof UserWithId> & RowDataPacket

export type User = z.infer<typeof UserSchema>

export const PartialUserSchema = UserSchema.partial()

export type UpdateUser = z.infer<typeof PartialUserSchema>
