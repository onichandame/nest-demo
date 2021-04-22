import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Entities } from '../model'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get(`MONGO_URL`),
        entities: Object.values(Entities),
        type: `mongodb`,
      }),
    }),
  ],
})
export class DbModule {}
