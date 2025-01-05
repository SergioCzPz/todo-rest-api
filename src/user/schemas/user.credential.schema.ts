import { CredentialSchema } from './credential.schema'
import { UserSchema } from './user.schema'
import { z } from 'zod'

const HasID = z.object({ id: z.string() })
export const UserCredentialSchema = UserSchema.merge(CredentialSchema)
const UserCredentialWithId = UserCredentialSchema.merge(HasID) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add user id

export type UserCredentialDb = z.infer<typeof UserCredentialWithId>

export type UserCredential = z.infer<typeof UserCredentialSchema>

export const PartialUserCredential = UserCredentialSchema.partial()

export type UpdateUserCredential = z.infer<typeof PartialUserCredential>
