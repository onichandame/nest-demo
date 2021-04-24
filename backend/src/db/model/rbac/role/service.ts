import { Injectable, Inject } from '@nestjs/common'

import { DbModelHelperService } from '../../helper'
import { RbacRole } from './entity'

@Injectable()
export class DbModelRbacRoleService {
  constructor(@Inject() private helpers: DbModelHelperService) {}
  create = this.helpers.createFactory(RbacRole)
  find = this.helpers.findFactory(RbacRole)
  update = this.helpers.updateFactory(RbacRole)
  delete = this.helpers.deleteFactory(RbacRole)
}
