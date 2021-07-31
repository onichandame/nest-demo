import { NestFactory } from '@nestjs/core';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ModelModule } from '@nest-libs/model';
import { Module, DynamicModule } from '@nestjs/common';

import { createFederationModule, createFederationGateway } from './factories';

const defaultPort = 80;

@Module({})
class Base {
  static forRoot(mod: any[]): DynamicModule {
    const modules = [ModelModule, ConfigModule, ...mod];
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
    const app = await NestFactory.create(Base.forRoot(modules));
    const config = app.get(ConfigService);
    const port = config.get<string>(`PORT`) || args.port || defaultPort;
    await app.listen(port);
  };
};
export * from './factories';
