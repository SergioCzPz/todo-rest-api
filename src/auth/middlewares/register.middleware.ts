import { validate } from '../../shared/middlewares/validate.middleware'
import { UserCredentialSchema } from '../../user/schemas/user.credential.schema'

export const validateUserRegister = validate(UserCredentialSchema)
