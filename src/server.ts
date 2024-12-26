import { ServerConfig } from './config/server.config'

export class Server extends ServerConfig {
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }
}
