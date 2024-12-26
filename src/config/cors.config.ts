import type { CorsOptions } from 'cors'
import { StatusCodes } from 'http-status-codes'
import { getEnvironment } from '../shared/helpers/env'
import { EnvVariables } from '../shared/constants/env/env.constants'

export const corsOptions: CorsOptions = {
  origin: getEnvironment(EnvVariables.ORIGIN),
  optionsSuccessStatus: StatusCodes.OK,
}
