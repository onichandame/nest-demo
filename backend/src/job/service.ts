import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

import { User } from '../db'
import { Role } from '../constants'

@Injectable()
export class JobService {
  constructor(@InjectEntityManager() private db: EntityManager) {}

  async initAdmin() {
    const admins = await this.db.find(User, { where: { roles: Role.ADMIN } })
    if (!admins.length) {
      await this.db.save(
        this.db.create<User>(User, { name: `admin`, roles: [Role.ADMIN] })
      )
    }
  }
}
