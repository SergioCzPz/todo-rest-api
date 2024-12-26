import type mysql from 'mysql2/promise'
import { EnvVariables } from '../shared/constants/env/env.constants'
import { getEnvironment, getNumEnvironment } from '../shared/helpers/env'

export const dbPoolConnectionOptions: mysql.PoolOptions = {
  host: getEnvironment(EnvVariables.DB_HOST),
  port: getNumEnvironment(EnvVariables.DB_PORT),
  user: getEnvironment(EnvVariables.DB_ADMIN_USER),
  password: getEnvironment(EnvVariables.DB_ADMIN_PASSWORD),
  database: getEnvironment(EnvVariables.DB_DATABASE),
}
