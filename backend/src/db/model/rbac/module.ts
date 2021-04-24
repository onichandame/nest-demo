import { Module } from '@nestjs/common'

import { DbModelHelperModule } from '../helper'
import { DbModelRbacRoleModule } from './role'
import { DbModelRbacObjectModule } from './object'
import { DbModelRbacPolicyModule } from './policy'

@Module({
  imports: [
    DbModelHelperModule,
    DbModelRbacRoleModule,
    DbModelRbacObjectModule,
    DbModelRbacPolicyModule,
  ],
})
export class DbModelRbacModule {}
