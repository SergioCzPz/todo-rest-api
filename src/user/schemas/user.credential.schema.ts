import { CredentialSchema } from './credential.schema'
import { UserSchema } from './user.schema'
import { z } from 'zod'

const HasID = z.object({ id: z.string() })
const UserCredential = UserSchema.merge(CredentialSchema)
const UserCredentialWithId = UserCredential.merge(HasID) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add user id

export type UserCredentialDb = z.infer<typeof UserCredentialWithId>

export type UserCredential = z.infer<typeof UserCredential>

export const PartialUserCredential = UserCredential.partial()

export type UpdateUserCredential = z.infer<typeof PartialUserCredential>
