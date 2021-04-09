import { Module } from '@nestjs/common'

import { StatusResolver } from './status.resolver'

@Module({ providers: [StatusResolver] })
export class StatusModule {}
