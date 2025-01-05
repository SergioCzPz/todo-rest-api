import { validate } from '../../shared/middlewares/validate.middleware'
import { CredentialSchema } from '../../user/schemas/credential.schema'

export const validateUserLogin = validate(CredentialSchema)
