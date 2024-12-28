import { validate } from '../../shared/middlewares/validate.middleware'
import { PartialUserSchema, UserSchema } from '../schemas/user.schema'

export const validateUserCreate = validate(UserSchema)
export const validateUserUpdate = validate(PartialUserSchema)
