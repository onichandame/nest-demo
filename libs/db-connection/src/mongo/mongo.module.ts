import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const startMockMongo = async (): Promise<{
  close(): void;
  url: string;
}> => {
  console.log(`called`);
  const replSet = new (require(`mongodb-memory-server`).MongoMemoryReplSet)({
    replSet: { storageEngine: `wiredTiger` },
  });
  console.log(`starting`);
  await replSet.waitUntilRunning();
  console.log(`started`);
  const url = await replSet.getUri();
  console.log(`ready`);
  return { url, close: () => replSet.stop() };
};

const MongoConnectionModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const isUnittest = () => config.get(`NODE_ENV`).includes(`test`);
    const url = isUnittest()
      ? (await startMockMongo()).url
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
