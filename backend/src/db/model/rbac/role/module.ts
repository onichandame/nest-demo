import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RbacRole } from './entity'
import { DbModelRbacRoleService } from './service'

@Module({
  imports: [TypeOrmModule.forFeature([RbacRole])],
  providers: [DbModelRbacRoleService],
  exports: [DbModelRbacRoleService],
})
export class DbModelRbacRoleModule {}
