import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RbacPolicy } from './entity'
import { DbModelRbacPolicyService } from './service'

@Module({
  imports: [TypeOrmModule.forFeature([RbacPolicy])],
  providers: [DbModelRbacPolicyService],
  exports: [DbModelRbacPolicyService],
})
export class DbModelRbacPolicyModule {}
