import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'

import { User } from '../db'
import { UserUpdateArgs, UserRegisterArgs } from '../types'

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private db: EntityManager) {}
  async register(args: UserRegisterArgs) {
    return this.db.save(this.db.create<User>(User, args))
  }

  async list() {
    return this.db.find<User>(User)
  }

  async update(id: string, args: UserUpdateArgs) {
    return this.db.update<User>(User, { id }, args)
  }
}
