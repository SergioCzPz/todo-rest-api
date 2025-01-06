import { z } from 'zod'
import { TaskSchema } from './task.schema'
import { StatusSchema } from './status.schema'
import type { RowDataPacket } from 'mysql2'

const HasID = z.object({ taskId: z.string() })
// const HasUserId = z.object({
//   userId: z.string(),
// })
const TaskStatus = TaskSchema.merge(StatusSchema)
const StatusWithId = TaskStatus.merge(HasID) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add task and user id
export const PartialTaskStatucSchema = TaskStatus.partial()

export type TaskStatusDb = z.infer<typeof StatusWithId> & RowDataPacket

export type TaskStatus = z.infer<typeof TaskStatus>

export type UpdateTaskStatus = z.infer<typeof PartialTaskStatucSchema>
