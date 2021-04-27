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
          transport: Transport.NATS,
          options: {
            url: configs.get<string>(`NATS_URL`) || `nats://localhost:4222`,
          },
        }),
    },
  ],
  exports: [ClientToken],
})
export class MicroserviceClientModule {}
