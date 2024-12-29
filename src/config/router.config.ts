import type { Router } from 'express'
import { UserRouter } from '../user/routes/user.route'
import { TaskRouter } from '../task/routes/task.route'

export function routers(): Router[] {
  return [new UserRouter().router, new TaskRouter().router]
}
