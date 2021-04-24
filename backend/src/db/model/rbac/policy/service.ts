import { Injectable, Inject } from '@nestjs/common'

import { DbModelHelperService } from '../../helper'
import { RbacPolicy } from './entity'

@Injectable()
export class DbModelRbacPolicyService {
  constructor(@Inject() private helpers: DbModelHelperService) {}
  create = this.helpers.createFactory(RbacPolicy)
  find = this.helpers.findFactory(RbacPolicy)
  update = this.helpers.updateFactory(RbacPolicy)
  delete = this.helpers.deleteFactory(RbacPolicy)
}
