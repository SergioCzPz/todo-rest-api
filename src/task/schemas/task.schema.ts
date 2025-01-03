import type { RowDataPacket } from 'mysql2'
import { z } from 'zod'

const minStringLength = 1

export const TaskSchema = z.object({
  task: z.string({ required_error: 'Task is required' }).trim().min(minStringLength, 'Name cannot be empty'),
})

const HasID = z.object({ taskId: z.string() })
const TaskWithId = TaskSchema.merge(HasID)
const HasUserId = z.object({
  userId: z.string({ required_error: 'User ID is required' }).trim().min(minStringLength, 'UserID is required'),
})
const TaskWithTaskUserId = HasUserId.merge(TaskWithId) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add task and user id

export type TaskDb = z.infer<typeof TaskWithTaskUserId> & RowDataPacket

export type TaskId = z.infer<typeof TaskWithId>

export type Task = z.infer<typeof TaskSchema> & RowDataPacket

export type CreateTask = z.infer<typeof TaskSchema>

export const PartialTaskSchema = TaskSchema.partial()

export type UpdateTask = z.infer<typeof PartialTaskSchema>
