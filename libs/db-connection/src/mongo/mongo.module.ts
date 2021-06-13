import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MockMongoModule, MockMongoService } from './mock';

const logger = new Logger(`MongoConnectionModule`);

const MongoConnectionModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule, MockMongoModule],
  inject: [ConfigService, MockMongoService],
  useFactory: async (config: ConfigService, mock: MockMongoService) => {
    const isUnittest = () => config.get(`NODE_ENV`).includes(`test`);
    logger.log(`bitch`);
    if (isUnittest()) logger.log(`using mock mongo server`);
    const url = isUnittest()
      ? await mock.getUri()
      : config.get<string>(`MONGO_URL`) || `mongodb://localhost:27017/test`;
    return {
      type: `mongodb`,
      synchronize: true,
      url,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
});

export { MongoConnectionModule };
