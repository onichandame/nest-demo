import { Injectable, Inject } from '@nestjs/common'

import { DbModelHelperService } from '../../helper'
import { RbacObject } from './entity'

@Injectable()
export class DbModelRbacObjectService {
  constructor(@Inject() private helpers: DbModelHelperService) {}
  create = this.helpers.createFactory(RbacObject)
  find = this.helpers.findFactory(RbacObject)
}
