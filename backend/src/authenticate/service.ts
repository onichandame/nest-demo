import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import { compare } from 'bcryptjs'

import { UserLoginArgs, UserLogoutArgs } from '../inputs'
import { SessionService } from '../session'
import { User } from '../db'

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectEntityManager() private db: EntityManager,
    private sessions: SessionService
  ) {}

  private async validateCredentials(pass: string, hash: string) {
    return compare(pass, hash)
  }

  async loginUser(args: UserLoginArgs) {
    const user = (
      await this.db.find<User>(User, {
        where: {
          $or: [{ name: args.nameOrEmail }, { email: args.nameOrEmail }],
        },
        take: 1,
      })
    )[0]
    if (!user) throw new Error(`user not found`)
    else if (
      !!user.password &&
      !(await this.validateCredentials(args.password, user.password))
    )
      throw new Error(`credential not valid`)
    else return this.sessions.createSession(user.id.toString())
  }

  async logoutUser(args: UserLogoutArgs) {
    return this.sessions.revokeSession(args.session)
  }

  async getUserFromSession(key: string) {
    const id = await this.sessions.getSession(key)
    if (!id) throw new Error(`session not found: ${key}`)
    const user = await this.db.findOneOrFail(User, id)
    return user
  }
}
