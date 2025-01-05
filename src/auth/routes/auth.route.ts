import type { Response } from 'express'
import type { RequestCreate } from '../../shared/constants/request/request'
import { BaseRouter } from '../../shared/routers/base.router'
import { AuthController } from '../controllers/auth.controller'
import type { UserCredential } from '../../user/schemas/user.credential.schema'
import { validateUserRegister } from '../middlewares/register.middleware'
import { validateUserLogin } from '../middlewares/login.middleware'
import type { CreateCredential } from '../../user/schemas/credential.schema'

export class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(AuthController)
    this.routes()
  }

  private routes(): void {
    this.router.post('/login', validateUserLogin, async (req: RequestCreate<CreateCredential>, res: Response) => {
      await this.controller.login(req, res)
    })

    this.router.post('/register', validateUserRegister, async (req: RequestCreate<UserCredential>, res: Response) => {
      await this.controller.register(req, res)
    })

    this.router.post('/logout', (req, res) => {
      AuthController.logout(req, res)
    })
  }
}
