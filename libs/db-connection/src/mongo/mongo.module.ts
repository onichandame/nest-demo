import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MockMongoModule, MockMongoService } from './mock';

const logger = new Logger(`MongoConnectionModule`);

@Module({})
export class MongoConnectionModule {
  static forRoot(args: { entities: [Function, ...Function[]] }): DynamicModule {
    return {
      module: MongoConnectionModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule, MockMongoModule],
          inject: [ConfigService, MockMongoService],
          useFactory: async (config: ConfigService, mock: MockMongoService) => {
            const isUnittest = () => config.get(`NODE_ENV`).includes(`test`);
            if (isUnittest()) logger.log(`using mock mongo server`);
            let url = config.get<string>(`MONGO_URL`);
            if (!url)
              if (isUnittest()) url = await mock.getUri();
              else throw new Error(`mongo url not specified!`);
            return {
              entities: args.entities,
              autoLoadEntities: true,
              type: `mongodb`,
              synchronize: true,
              url,
              useNewUrlParser: true,
              useUnifiedTopology: true,
            };
          },
        }),
      ],
    };
  }
}
