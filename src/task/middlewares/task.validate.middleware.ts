import { validate } from '../../shared/middlewares/validate.middleware'
import { PartialTaskSchema, TaskSchema } from '../schemas/task.schema'

export const validateTaskCreate = validate(TaskSchema)
export const validateTaskUpdate = validate(PartialTaskSchema)
