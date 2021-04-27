import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let mongoUrl =
          configService.get<string>(`MONGO_URL`) ||
          `mongodb://localhost:27017/test`
        return {
          url: mongoUrl,
          synchronize: true,
          autoLoadEntities: true,
          type: `mongodb`,
          keepConnectionAlive: true,
        }
      },
    }),
  ],
})
export class DbConnectionModule {}
