import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

const mainLogger = new Logger(`User`);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: { port: 3001, package: `user`, protoPath },
    },
  );
  app.listen(() => mainLogger.log(`service ready`));
}
bootstrap();
