import type { UpdateStatusNoBoolean } from '../../task/schemas/status.schema'
import type { UpdateTaskStatus } from '../../task/schemas/task.status.schema'

const trueNum = 1
const falseNum = 0

export function transformTaskStatus(input: UpdateTaskStatus): UpdateStatusNoBoolean {
  const { status, startDate, finishDate } = input

  const result: UpdateStatusNoBoolean = {}

  if (status !== undefined) {
    result.status = status ? trueNum : falseNum
  }

  if (startDate !== undefined) {
    result.startDate = startDate
  }

  if (finishDate !== undefined) {
    result.finishDate = finishDate
  }

  return result
}
