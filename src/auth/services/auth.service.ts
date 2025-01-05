import pool from '../../data/db'
import bcrypt from 'bcrypt'
import { UserService } from '../../user/services/user.service'
import type { UserCredential } from '../../user/schemas/user.credential.schema'
import { CredentialService } from '../../user/services/credential.service'
import type { CreateCredential } from '../../user/schemas/credential.schema'

export class AuthService {
  private readonly dbConnection
  private readonly affectedRow = 1

  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly credentialService: CredentialService = new CredentialService(),
  ) {
    this.dbConnection = pool
  }

  async authenticate(credential: CreateCredential): Promise<boolean> {
    const { email, password } = credential
    const emailDb = await this.credentialService.getEmailByEmail(email)

    if (emailDb === undefined) return false

    const passwordDb = await this.credentialService.getPasswordByEmail(email)

    const isValid = await bcrypt.compare(password, passwordDb)

    return isValid
  }

  async register(user: UserCredential): Promise<boolean> {
    const [resultSetHeaderUser, resultSetHeaderCredential] = await this.userService.createUser(user)

    return (
      resultSetHeaderUser.affectedRows === this.affectedRow &&
      resultSetHeaderCredential.affectedRows === this.affectedRow
    )
  }
}
