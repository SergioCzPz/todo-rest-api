import { z } from 'zod'
import { TaskSchema } from './task.schema'
import { StatusSchema } from './status.schema'

const minStringLength = 1
const HasID = z.object({ taskId: z.string() })
const HasUserId = z.object({
  userId: z.string({ required_error: 'User ID is required' }).trim().min(minStringLength, 'UserID is required'),
})
const TaskStatus = TaskSchema.merge(StatusSchema)
const StatusWithId = TaskStatus.merge(HasID).merge(HasUserId) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add task and user id

export type TaskStatusDb = z.infer<typeof StatusWithId>

export type TaskStatus = z.infer<typeof TaskStatus>
