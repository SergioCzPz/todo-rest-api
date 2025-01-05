import type { NextFunction, Response } from 'express'
import type { ReqAuthUser } from '../constants/request/request'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { verifyToken } from '../helpers/jwt'

export const checkJwt = function (req: ReqAuthUser, res: Response, next: NextFunction): void {
  try {
    const {
      cookies: { access_token }, // eslint-disable-line @typescript-eslint/naming-convention -- easy to read name due to is a cookie
    } = req

    if (access_token === undefined) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED })
      return
    }

    const { idUser } = verifyToken(access_token)

    if (req.session === undefined) {
      req.session = { userId: '' }
    }

    req.session.userId = idUser

    next()
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED })
  }
}
