import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url =
          config.get<string>(`MONGO_URL`) || `mongodb://localhost:27017/test`;
        return {
          url,
          useUnifiedTopology: true,
          autoLoadEntities: true,
          synchronize: true,
          type: `mongodb`,
          keepConnectionAlive: true,
          useNewUrlParser: true,
        };
      },
    }),
  ],
})
export class MongoConnectionModule {}
