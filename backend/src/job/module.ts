import { Module } from '@nestjs/common'

import { JobService } from './service'
import { JobController } from './controller'

@Module({ controllers: [JobController], providers: [JobService] })
export class JobModule {}
