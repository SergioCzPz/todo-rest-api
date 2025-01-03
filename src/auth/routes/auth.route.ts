import type { Response } from 'express'
import type { RequestCreate } from '../../shared/constants/request/request'
import { BaseRouter } from '../../shared/routers/base.router'
import { AuthController } from '../controllers/auth.controller'
import type { Credential } from '../schemas/auth.schema'
import type { UserCredential } from '../../user/schemas/user.credential.schema'

export class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(AuthController)
    this.routes()
  }

  private routes(): void {
    this.router.post('/login', async (req: RequestCreate<Credential>, res: Response) => {
      await this.controller.login(req, res)
    })

    this.router.post('/register', async (req: RequestCreate<UserCredential>, res: Response) => {
      await this.controller.register(req, res)
    })

    this.router.post('/logout', (req, res) => {
      AuthController.logout(req, res)
    })
  }
}
