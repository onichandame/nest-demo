import { NestFactory } from '@nestjs/core'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'

import { BaseModule } from './base'

export const createMicroservice = async (module: any) =>
  NestFactory.createMicroservice<MicroserviceOptions>(
    BaseModule.forRoot(module),
    {
      transport: Transport.NATS,
      options: { queue: `auth`, name: `auth`, url: `nats://localhost:4222` },
    }
  )
