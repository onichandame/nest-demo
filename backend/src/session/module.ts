import { Module, CacheModule } from '@nestjs/common'
import * as redisStore from 'cache-manager-ioredis'

import { RedisModule, RedisService } from '../redis'
import { SESSION_TTL } from '../constants'
import { SessionService } from './service'

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [RedisModule],
      useFactory: async (redis: RedisService) => ({
        ttl: SESSION_TTL,
        refreshThreshold: SESSION_TTL,
        store: redisStore,
        redisInstance: redis.client,
      }),
      inject: [RedisService],
    }),
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
