import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { JobArgs } from '../types'
import { JobInitAdminPattern } from '../constants'
import { JobService } from './service'

@Controller()
export class JobController {
  constructor(private jobSvc: JobService) {}

  @MessagePattern(JobInitAdminPattern)
  async initAdmin(args: JobArgs) {
    const res = this.jobSvc.initAdmin()
    if (args.async) return
    else return res
  }
}
