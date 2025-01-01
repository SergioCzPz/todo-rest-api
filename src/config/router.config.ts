import type { Router } from 'express'
import { UserRouter } from '../user/routes/user.route'
import { TaskRouter } from '../task/routes/task.route'
import { AuthRouter } from '../auth/routes/auth.route'

export function routers(): Router[] {
  return [new UserRouter().router, new TaskRouter().router, new AuthRouter().router]
}
