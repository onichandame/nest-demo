import { NestFactory } from '@nestjs/core'

import { BaseModule } from './base'

export const createGateway = async (module: any) =>
  NestFactory.create(BaseModule.forRoot(module))
