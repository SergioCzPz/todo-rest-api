import type { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import type { RequestCreate } from '../../shared/constants/request/request'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { UserService } from '../../user/services/user.service'
import { signJwt } from '../middlewares/auth.middleware'
import type { CreateCredential } from '../../user/schemas/credential.schema'
import type { UserCredential } from '../../user/schemas/user.credential.schema'

export class AuthController {
  constructor(
    private readonly authService: AuthService = new AuthService(),
    private readonly userService: UserService = new UserService(),
  ) {}

  async login(req: RequestCreate<CreateCredential>, res: Response): Promise<void> {
    try {
      const isValid = await this.authService.authenticate(req.body)

      if (!isValid) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED, data: 'No valid credentials' })
        return
      }

      const userId = await this.userService.getUserIdByEmail(req.body.email)
      const token = signJwt(userId)

      res.cookie('access_token', token, {
        httpOnly: true,
      })

      // res.redirect('/dashboard')
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: token })
    } catch (error) {
      console.log(error)
    }
  }

  async register(req: RequestCreate<UserCredential>, res: Response): Promise<void> {
    try {
      const isRegisteredCorrect = await this.authService.register(req.body)
      if (!isRegisteredCorrect) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
        return
      }

      const userId = await this.userService.getUserIdByEmail(req.body.email)
      const token = signJwt(userId)

      res.cookie('access_token', token, {
        httpOnly: true,
      })

      // res.redirect('/dashboard')
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: token })
    } catch (error) {
      console.log(error)
    }
  }

  static logout(req: Request, res: Response): void {
    res.clearCookie('access_token').json({ message: 'Logout successful' })
  }
}
