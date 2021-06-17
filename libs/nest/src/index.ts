import { NestFactory } from '@nestjs/core';
//import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
  //ExecutionContext,
  //Injectable,
  Module,
  DynamicModule,
} from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';

//import { AuthModule } from '@kesci/auth';
import { createFederationModule, createFederationGateway } from './factories';

const defaultPort = 80;

//@Injectable()
//class GqlSessionGuard extends AuthGuard(`jwt`) {
//  getRequest(ctx: ExecutionContext) {
//    return GqlExecutionContext.create(ctx).getContext().req;
//  }
//}

@Module({})
class Base {
  static forRoot(mod: any[]): DynamicModule {
    const modules = [ConfigModule, ...mod];
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
    //if (args.gateway) app.useGlobalGuards(new GqlSessionGuard());
    const config = app.get(ConfigService);
    const port = config.get<string>(`PORT`) || args.port || defaultPort;
    await app.listen(port);
  };
};
export * from './factories';
