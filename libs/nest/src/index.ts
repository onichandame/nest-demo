import { NestjsCommon, NestjsCore, NestjsConfig } from '@nest-libs/deps';
import { ModelModule } from '@nest-libs/model';

import { createFederationModule, createFederationGateway } from './factories';

const defaultPort = 80;

@NestjsCommon.Module({})
class Base {
  static forRoot(mod: any[]): NestjsCommon.DynamicModule {
    const modules = [ModelModule, NestjsConfig.ConfigModule, ...mod];
    return { module: Base, imports: modules };
  }
}

export const getBootstrapper = (args: {
  app?: any;
  gateway?: boolean;
  port?: number;
}) => {
  return async () => {
    const modules = [];
    if (args.app) modules.push(args.app);
    if (args.gateway) modules.push(createFederationGateway());
    else modules.push(createFederationModule());
    const app = await NestjsCore.NestFactory.create(Base.forRoot(modules));
    const config = app.get(NestjsConfig.ConfigService);
    const port = config.get<string>(`PORT`) || args.port || defaultPort;
    await app.listen(port);
  };
};
