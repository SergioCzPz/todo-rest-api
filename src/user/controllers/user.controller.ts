import type { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers()
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: users })
    } catch (error) {
      console.log(error)
    }
  }
}
