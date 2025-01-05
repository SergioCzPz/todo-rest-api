import type { Request, Response } from 'express'
import { BaseRouter } from '../../shared/routers/base.router'
import { TaskController } from '../controllers/task.controller'
import { validateTaskCreate, validateTaskUpdate } from '../middlewares/task.validate.middleware'
import type { RequestCreate, RequestUpdate } from '../../shared/constants/request/request'
import type { CreateTask, UpdateTask } from '../schemas/task.schema'
import { checkJwt } from '../../shared/middlewares/auth.middleware'

export class TaskRouter extends BaseRouter<TaskController> {
  constructor() {
    super(TaskController)
    this.routes()
  }

  private routes(): void {
    this.router.get('/tasks', async (req: Request, res: Response) => {
      await this.controller.getTasks(req, res)
    })

    this.router.get('/tasks/:id', async (req: Request, res: Response) => {
      await this.controller.getTask(req, res)
    })

    this.router.post('/tasks', checkJwt, validateTaskCreate, async (req: RequestCreate<CreateTask>, res: Response) => {
      await this.controller.createTask(req, res)
    })

    this.router.patch(
      '/tasks/:id',
      checkJwt,
      validateTaskUpdate,
      async (req: RequestUpdate<UpdateTask, string>, res: Response) => {
        await this.controller.updateTask(req, res)
      },
    )

    this.router.delete('/tasks/:id', async (req: Request, res: Response) => {
      await this.controller.deleteTask(req, res)
    })
  }
}
