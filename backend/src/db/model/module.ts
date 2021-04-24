import { Module } from '@nestjs/common'

// services
import { DbModelHelperModule } from './helper'

// schemas
import { DbModelUserModule } from './user'
import { DbModelRbacModule } from './rbac'

@Module({
  imports: [DbModelHelperModule, DbModelUserModule, DbModelRbacModule],
})
export class DbModelModule {}
