import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri =
          config.get<string>(`MONGO_URL`) || `mongodb://localhost:27017/test`;
        return {
          uri,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
    }),
  ],
})
export class MongoConnectionModule {}
