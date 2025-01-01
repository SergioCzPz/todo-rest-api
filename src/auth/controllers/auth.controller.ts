import type { Response } from 'express'
import { AuthService } from '../services/auth.service'
import type { RequestCreate } from '../../shared/constants/request/request'
import type { Credential } from '../schemas/auth.schema'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export class AuthController {
  constructor(private readonly authService: AuthService = new AuthService()) {}

  async login(req: RequestCreate<Credential>, res: Response): Promise<void> {
    try {
      const isValid = await this.authService.login(req.body)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: isValid })
    } catch (error) {
      console.log(error)
    }
  }
}
