import type { Router } from 'express'
import { UserRouter } from '../user/routes/user.route'

export function routers(): Router[] {
  return [new UserRouter().router]
}
