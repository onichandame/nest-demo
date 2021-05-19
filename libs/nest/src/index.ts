import { NestFactory } from '@nestjs/core';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Module, DynamicModule } from '@nestjs/common';

@Module({})
class Base {
  static forRoot(mod: any): DynamicModule {
    const modules = [ConfigModule, mod];
    return { module: Base, imports: modules };
  }
}

export const getBootstrapper = (mod: any, defaultPort = 80) => {
  return async () => {
    const app = await NestFactory.create(Base.forRoot(mod));
    const config = app.get(ConfigService);
    const port = config.get<string>(`PORT`) || defaultPort;
    await app.listen(port);
  };
};
