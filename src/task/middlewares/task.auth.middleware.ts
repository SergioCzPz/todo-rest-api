import type { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from '../../shared/middlewares/base.middleware'

export class TaskMiddleware extends BaseMiddleware {
  userMid(req: Request, res: Response, next: NextFunction): void {
    this.middleFunction()

    next()
  }
}
