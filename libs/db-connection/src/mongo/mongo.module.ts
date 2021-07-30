import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, DynamicModule } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import {
  MockMongoModule,
  MockMongoService,
} from '@onichandame/nestjs-mongodb-in-memory';

@Module({})
export class MongoConnectionModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoConnectionModule,
      imports: [
        TypegooseModule.forRootAsync({
          imports: [ConfigModule, MockMongoModule],
          inject: [ConfigService, MockMongoService],
          useFactory: async (config: ConfigService, mock: MockMongoService) => {
            const isUnittest = () => config.get(`NODE_ENV`)?.includes(`test`);
            let uri = config.get<string>(`MONGO_URL`);
            if (!uri)
              if (isUnittest()) uri = await mock.getUri();
              else throw new Error(`mongo url not specified!`);
            return {
              uri,
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false,
            };
          },
        }),
      ],
    };
  }
}
