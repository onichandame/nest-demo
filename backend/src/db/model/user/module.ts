import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DbModelHelperModule } from '../helper'
import { User } from './entity'
import { DbModelUserService } from './service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), DbModelHelperModule],
  providers: [DbModelUserService],
  exports: [DbModelUserService],
})
export class DbModelUserModule {}
