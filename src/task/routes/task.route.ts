import type { Request, Response } from 'express'
import { BaseRouter } from '../../shared/routers/base.router'
import { TaskController } from '../controllers/task.controller'
import { validatePostTask, validateTaskUpdate } from '../middlewares/task.validate.middleware'
import type { RequestCreate, RequestUpdate } from '../../shared/constants/request/request'
import type { CreateTask, UpdateTaskDto } from '../schemas/task.schema'

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

    this.router.post('/tasks', validatePostTask, async (req: RequestCreate<CreateTask>, res: Response) => {
      await this.controller.createTask(req, res)
    })

    this.router.patch(
      '/tasks/:id',
      validateTaskUpdate,
      async (req: RequestUpdate<UpdateTaskDto, string>, res: Response) => {
        await this.controller.updateTask(req, res)
      },
    )

    this.router.delete('/tasks/:id', async (req: Request, res: Response) => {
      await this.controller.deleteTask(req, res)
    })
  }
}
