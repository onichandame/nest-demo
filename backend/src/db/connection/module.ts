import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let mongoUrl = configService.get<string>(`MONGO_URL`)
        return {
          url: mongoUrl,
          autoLoadEntities: true,
          type: `mongodb`,
        }
      },
    }),
  ],
})
export class DbConnectionModule {}
