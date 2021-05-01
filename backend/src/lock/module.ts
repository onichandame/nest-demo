import { Module } from '@nestjs/common'

import { RedisModule } from '../redis'
import { LockService } from './service'

@Module({
  imports: [RedisModule],
  providers: [LockService],
  exports: [LockService],
})
export class LockModule {}
