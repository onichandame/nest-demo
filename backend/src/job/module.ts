import { Module } from '@nestjs/common'

import { JobService } from './service'

@Module({ providers: [JobService] })
export class JobModule {}
