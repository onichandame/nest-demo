import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { User } from './user.data';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private db: EntityManager) {}

  async findById(id: string) {
    return this.db.findOne(User, { id });
  }
}
