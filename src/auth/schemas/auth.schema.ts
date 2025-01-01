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

export type Credential = z.infer<typeof CredentialSchema>
