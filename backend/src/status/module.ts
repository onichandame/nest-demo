import { Module } from '@nestjs/common'

import { StatusResolver } from './resolver'

@Module({ providers: [StatusResolver] })
export class StatusModule {}
