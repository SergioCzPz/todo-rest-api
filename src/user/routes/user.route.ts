import type { Request, Response } from 'express'
import { BaseRouter } from '../../shared/routers/base.router'
import { UserController } from '../controllers/user.controller'
import { validateUserCreate, validateUserUpdate } from '../middlewares/user.validate.middleware'
import type { CreateUserDto, UpdateUserDto } from '../schemas/user.schema'
import type { RequestCreate, RequestUpdate } from '../../shared/constants/request/request'

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController)
    this.routes()
  }

  private routes(): void {
    this.router.get('/users', async (req: Request, res: Response) => {
      await this.controller.getUsers(req, res)
    })

    this.router.get('/users/:id', async (req: Request, res: Response) => {
      await this.controller.getUser(req, res)
    })

    this.router.post('/users', validateUserCreate, async (req: RequestCreate<CreateUserDto>, res: Response) => {
      await this.controller.createUser(req, res)
    })

    this.router.patch(
      '/users/:id',
      validateUserUpdate,
      async (req: RequestUpdate<UpdateUserDto, string>, res: Response) => {
        await this.controller.updateUser(req, res)
      },
    )

    this.router.delete('/users/:id', async (req: Request, res: Response) => {
      await this.controller.deleteUser(req, res)
    })
  }
}
