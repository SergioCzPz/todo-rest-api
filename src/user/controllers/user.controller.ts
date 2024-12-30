import type { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { RequestCreate, RequestUpdate } from '../../shared/constants/request/request'
import type { CreateUserDto, UpdateUserDto } from '../schemas/user.schema'

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

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      const user = await this.userService.getUser(id)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: user })
    } catch (error) {
      console.log(error)
    }
  }

  async createUser(req: RequestCreate<CreateUserDto>, res: Response): Promise<void> {
    try {
      const resultSetHeader = await this.userService.createUser(req.body)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }

  async updateUser(req: RequestUpdate<UpdateUserDto, string>, res: Response): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      const resultSetHeader = await this.userService.updateUser(id, req.body)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      const resultSetHeader = await this.userService.deleteUser(id)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }
}
