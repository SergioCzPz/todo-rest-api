import { z } from 'zod'

const minStringLength = 1

export const TaskSchema = z.object({
  task: z.string({ required_error: 'Task is required' }).trim().min(minStringLength, 'Name cannot be empty'),
  userId: z.string({ required_error: 'User ID is required' }).trim().min(minStringLength, 'UserID is required'),
  status: z.boolean({ required_error: 'Status task is required', invalid_type_error: 'status must be a boolean' }),
  startDate: z.date({
    required_error: 'Date must be provided',
    invalid_type_error: 'Date must have next pattern yyyy-mm-dd',
  }),
  finishDate: z
    .date({
      required_error: 'Date must be provided',
      invalid_type_error: 'Date must have next pattern yyyy-mm-dd',
    })
    .optional(),
})

const HasID = z.object({ taskId: z.string() })
const TaskWithId = TaskSchema.merge(HasID) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add task and user id

export type Task = z.infer<typeof TaskWithId>

// DTO
export type CreateTaskDto = z.infer<typeof TaskSchema>

export const PartialTaskSchema = TaskSchema.partial()

export type UpdateTaskDto = z.infer<typeof PartialTaskSchema>
