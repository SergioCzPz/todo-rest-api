import { validate } from '../../shared/middlewares/validate.middleware'
import { TaskSchema } from '../schemas/task.schema'
import { PartialTaskStatucSchema } from '../schemas/task.status.schema'

export const validateTaskCreate = validate(TaskSchema)
export const validateTaskUpdate = validate(PartialTaskStatucSchema)
