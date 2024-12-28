import { z } from 'zod'

const minStringLength = 1
const minPasswordLength = 6

export const UserSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim().min(minStringLength, 'Name cannot be empty'),
  surname: z.string({ required_error: 'Surname is required' }).trim().min(minStringLength, 'Surname cannot be empty'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(minStringLength, 'Email cannot be empty')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(minPasswordLength, `Password needs to be at least ${minPasswordLength} characters length`),
  occupation: z
    .string({ required_error: 'Occupation is required' })
    .trim()
    .min(minStringLength, 'Occupation cannot be empty'),
})

const HasID = z.object({ id: z.string() })
const UserWithId = UserSchema.merge(HasID)

export type User = z.infer<typeof UserWithId>

// DTO
export type CreateUserDto = z.infer<typeof UserSchema>

export const PartialUserSchema = UserSchema.partial()

export type UpdateUserDto = z.infer<typeof PartialUserSchema>
