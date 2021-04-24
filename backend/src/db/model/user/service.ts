import { Injectable, Inject } from '@nestjs/common'

import { DbModelHelperService } from '../helper'
import { User } from './entity'

@Injectable()
export class DbModelUserService {
  constructor(@Inject() private helpers: DbModelHelperService) {}
  create = this.helpers.createFactory(User)
  find = this.helpers.findFactory(User)
  update = this.helpers.updateFactory(User)
  delete = this.helpers.deleteFactory(User)
}
