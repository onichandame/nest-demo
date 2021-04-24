import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RbacObject } from './entity'
import { DbModelRbacObjectService } from './service'

@Module({
  imports: [TypeOrmModule.forFeature([RbacObject])],
  providers: [DbModelRbacObjectService],
  exports: [DbModelRbacObjectService],
})
export class DbModelRbacObjectModule {}
