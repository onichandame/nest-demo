import { Module } from '@nestjs/common'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { ConfigService, ConfigModule } from '@nestjs/config'

import { ClientToken } from '../../constants'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: ClientToken,
      inject: [ConfigService],
      useFactory: (configs: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: configs.get<string>(`REDIS_URL`) || `redis://localhost:6379`,
          },
        }),
    },
  ],
  exports: [ClientToken],
})
export class MicroserviceClientModule {}
