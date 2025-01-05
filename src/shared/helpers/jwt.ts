import { sign, verify, decode, type JwtPayload } from 'jsonwebtoken'
import { getEnvironment } from './env'
import { EnvVariables } from '../constants/env/env.constants'

export interface PayloadUserId extends JwtPayload {
  idUser: string
}

const expires = '12h'

export const signJwt = function (idUser: string): string {
  const token = sign({ idUser }, getEnvironment(EnvVariables.JWT_SECRET), {
    expiresIn: expires,
  })
  return token
}

export const verifyToken = function (jwt: string): PayloadUserId {
  const isValidJwt = verify(jwt, getEnvironment(EnvVariables.JWT_SECRET)) as PayloadUserId // eslint-disable-line @typescript-eslint/no-unsafe-type-assertion -- Extends from JwtPayload
  return isValidJwt
}

export const decodeJwt = function (token: string): string | JwtPayload {
  return decode(token) ?? ''
}
