import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri =
          config.get<string>(`MONGO_URL`) || `mongodb://localhost:27017/test`;
        return {
          uri,
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
