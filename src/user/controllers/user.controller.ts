import { CredentialService } from '../services/credential.service'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { UserService } from '../services/user.service'
import type { Response } from 'express'
import type { ReqAuthUser, RequestUpdate } from '../../shared/constants/request/request'
import type { UpdateUser } from '../schemas/user.schema'
import type { UpdateCredential } from '../schemas/credential.schema'

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly credentialService: CredentialService = new CredentialService(),
  ) {}

  async getUser(req: ReqAuthUser, res: Response): Promise<void> {
    try {
      if (req.session?.userId === undefined) throw Error('No User Found')
      const {
        session: { userId },
      } = req
      const user = await this.userService.getUserById(userId)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: user })
    } catch (error) {
      console.log(typeof error)
    }
  }

  async updateUser(req: RequestUpdate<UpdateUser, string>, res: Response): Promise<void> {
    try {
      if (req.session?.userId === undefined) throw Error('No User Found')
      const {
        session: { userId },
      } = req
      const resultSetHeader = await this.userService.updateUser(userId, req.body)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(req: ReqAuthUser, res: Response): Promise<void> {
    try {
      if (req.session?.userId === undefined) throw Error('No User Found')
      const {
        session: { userId },
      } = req
      const resultSetHeader = await this.userService.deleteUser(userId)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }

  async updateUserCredential(req: RequestUpdate<UpdateCredential, string>, res: Response): Promise<void> {
    try {
      if (req.session?.userId === undefined) throw Error('No User Found')
      const {
        session: { userId },
      } = req

      const resultSetHeader = await this.credentialService.updateCredential(userId, req.body)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }
}
