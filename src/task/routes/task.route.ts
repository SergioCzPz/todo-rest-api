import type { Request, Response } from 'express'
import { BaseRouter } from '../../shared/routers/base.router'
import { TaskController } from '../controllers/task.controller'
import { TaskMiddleware } from '../middlewares/task.auth.middleware'

export class TaskRouter extends BaseRouter<TaskController, TaskMiddleware> {
  constructor() {
    super(TaskController, TaskMiddleware)
    this.routes()
  }

  private routes(): void {
    this.router.get('/tasks', async (req: Request, res: Response) => {
      await this.controller.getTasks(req, res)
    })

    this.router.get('/tasks/:id', async (req: Request, res: Response) => {
      await this.controller.getTask(req, res)
    })
  }
}
