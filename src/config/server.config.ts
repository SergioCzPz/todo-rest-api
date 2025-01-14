import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import { EnvVariables } from '../shared/constants/env/env.constants'
import { getNumEnvironment } from '../shared/helpers/env'
import { corsOptions } from './cors.config'
import { routers } from './router.config'

export class ServerConfig {
  public app: express.Application
  public readonly port: number

  constructor() {
    this.app = express()
    this.port = getNumEnvironment(EnvVariables.PORT)
    this.configureMiddleware()
  }

  private configureMiddleware(): void {
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors(corsOptions))
    this.app.use(cookieParser())
    this.app.use('/api', routers())
  }
}
