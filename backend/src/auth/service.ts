import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'

import { Entities } from '../model'
import { RoleAction } from '../constants'

@Injectable()
export class AuthService {
  constructor(@InjectEntityManager() private entities: EntityManager) {}

  async authenticate(source: string, _: RoleAction, __: string) {
    const user = await this.entities.findOne(Entities.User, source)
    console.log(user.roles)
    return true
  }
}
