import jwt from 'jsonwebtoken'
import { getEnvironment } from '../../shared/helpers/env'
import { EnvVariables } from '../../shared/constants/env/env.constants'

const expires = '12h'

export const signJwt = function (idUser: string): string {
  const token = jwt.sign({ idUser }, getEnvironment(EnvVariables.JWT_SECRET), {
    expiresIn: expires,
  })
  return token
}
