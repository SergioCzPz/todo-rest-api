import type { RowDataPacket } from 'mysql2'
import { z } from 'zod'

const minStringLength = 1
const minPasswordLength = 6

export const CredentialSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(minStringLength, 'Email cannot be empty')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(minPasswordLength, `Password needs to be at least ${minPasswordLength} characters length`),
})

const HasID = z.object({ id: z.string() })
const CredentialWithId = CredentialSchema.merge(HasID) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add user id

export type Credential = z.infer<typeof CredentialSchema> & RowDataPacket

export type CredentialDb = z.infer<typeof CredentialWithId>

export type CreateCredential = z.infer<typeof CredentialSchema>

export const PartialCredentialSchema = CredentialSchema.partial()

export type UpdateCredential = z.infer<typeof PartialCredentialSchema>
