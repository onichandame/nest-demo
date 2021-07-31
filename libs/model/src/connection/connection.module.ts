import {
  OnichandameNestjsMongodbInMemory,
  NestjsConfig,
  NestjsCommon,
  NestjsTypegoose,
} from '@nest-libs/deps';

@NestjsCommon.Module({})
export class ConnectionModule {
  static forRoot(): NestjsCommon.DynamicModule {
    return {
      module: ConnectionModule,
      imports: [
        NestjsTypegoose.TypegooseModule.forRootAsync({
          imports: [
            NestjsConfig.ConfigModule,
            OnichandameNestjsMongodbInMemory.MockMongoModule,
          ],
          inject: [
            NestjsConfig.ConfigService,
            OnichandameNestjsMongodbInMemory.MockMongoService,
          ],
          useFactory: async (
            config: NestjsConfig.ConfigService,
            mock: OnichandameNestjsMongodbInMemory.MockMongoService
          ) => {
            const isUnittest = () => config.get(`NODE_ENV`)?.includes(`test`);
            let uri: string;
            if (isUnittest()) uri = await mock.getUri();
            else uri = config.get<string>(`MONGO_URL`) || ``;
            if (!uri) throw new Error(`mongo url not specified!`);
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
