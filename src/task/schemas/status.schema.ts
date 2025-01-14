import { z } from 'zod'

const trueNum = 1 // eslint-disable-line @typescript-eslint/no-unused-vars -- No magic numbers
const falseNum = 0 // eslint-disable-line @typescript-eslint/no-unused-vars -- No magic numbers

export const StatusSchema = z.object({
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
const StatusWithId = StatusSchema.merge(HasID) // eslint-disable-line @typescript-eslint/no-unused-vars -- Is used for add task and user id

export type StatusDb = z.infer<typeof StatusWithId>

export type Status = z.infer<typeof StatusSchema>

export type CreateStatus = z.infer<typeof StatusSchema>

export const PartialStatusSchema = StatusSchema.partial()
export type UpdateStatus = z.infer<typeof PartialStatusSchema>

const Status = z.object({
  status: z.number(),
})

const StatusNoBoolean = StatusSchema.omit({ status: true }).merge(Status).partial() // eslint-disable-line @typescript-eslint/no-unused-vars -- Use to change boolean to number
export type UpdateStatusNoBoolean = z.infer<typeof StatusNoBoolean>
