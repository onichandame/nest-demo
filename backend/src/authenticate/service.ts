import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import { compare } from 'bcryptjs'

import { UserLoginArgs, UserLoginReply } from '../types'
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
    let result: UserLoginReply
    const user = (
      await this.db.find<User>(User, {
        where: {
          $or: [{ name: args.nameOrEmail }, { email: args.nameOrEmail }],
        },
        take: 1,
      })
    )[0]
    if (!user) result = { ok: false, reason: `user not found` }
    else if (
      !!user.password &&
      !(await this.validateCredentials(args.password, user.password))
    )
      result = { ok: false, reason: `credential not valid` }
    else
      result = {
        ok: true,
        session: await this.sessions.createSession(user.id.toString()),
      }
    return result
  }

  async getUserFromSession(key: string) {
    const id = await this.sessions.getSession(key)
    if (!id) throw new Error(`session not found: ${key}`)
    const user = await this.db.findOneOrFail(User, id)
    return user
  }
}
