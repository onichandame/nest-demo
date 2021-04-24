import { Injectable, Inject } from '@nestjs/common'

import { DbModelUserService, User } from '../db'
import { UserUpdateArgs, UserRegisterArgs } from '../types'

@Injectable()
export class UserService {
  constructor(@Inject() private users: DbModelUserService) {}
  async register(args: UserRegisterArgs) {
    return this.users.create(args)
  }

  async update(id: string, args: UserUpdateArgs) {
    return this.users.update({ id }, args)
  }
}
