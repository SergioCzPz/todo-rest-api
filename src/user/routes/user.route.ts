import type { Request, Response } from 'express'
import { BaseRouter } from '../../shared/routers/base.router'
import { UserController } from '../controllers/user.controller'
import { UserMiddleware } from '../middlewares/user.middleware'

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware)
    this.routes()
  }

  private routes(): void {
    this.router.get('/users', async (req: Request, res: Response) => {
      await this.controller.getUsers(req, res)
    })
  }
}
