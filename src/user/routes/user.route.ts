import { BaseRouter } from '../../shared/routers/base.router'
import { UserController } from '../controllers/user.controller'
import { validateUserUpdate } from '../middlewares/user.validate.middleware'
import { checkJwt } from '../../shared/middlewares/auth.middleware'
import type { UpdateUser } from '../schemas/user.schema'
import type { ReqAuthUser, RequestUpdate } from '../../shared/constants/request/request'
import type { Response } from 'express'
import type { UpdateCredential } from '../schemas/credential.schema'

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController)
    this.routes()
  }

  private routes(): void {
    this.router.get('/users', checkJwt, async (req: ReqAuthUser, res: Response) => {
      await this.controller.getUser(req, res)
    })

    this.router.patch(
      '/users',
      checkJwt,
      validateUserUpdate,
      async (req: RequestUpdate<UpdateUser, string>, res: Response) => {
        await this.controller.updateUser(req, res)
      },
    )

    this.router.delete('/users', checkJwt, async (req: ReqAuthUser, res: Response) => {
      await this.controller.deleteUser(req, res)
    })

    this.router.patch(
      '/users/credentials',
      checkJwt,
      async (req: RequestUpdate<UpdateCredential, string>, res: Response) => {
        await this.controller.updateUserCredential(req, res)
      },
    )
  }
}
