import { validate } from '../../shared/middlewares/validate.middleware'
import { PartialTaskSchema, TaskSchema, TaskCreateSchema } from '../schemas/task.schema'

export const validateTaskCreate = validate(TaskSchema)
export const validateTaskUpdate = validate(PartialTaskSchema)
export const validatePostTask = validate(TaskCreateSchema)
