import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

import { JobInstance } from '../db'
import { wait } from '../utils'
import { JobStatus } from '../constants'
import { BaseJob } from './baseJob'
import * as Jobs from './jobs'

@Injectable()
export class JobService implements OnApplicationBootstrap {
  private readonly logger = new Logger(this.constructor.name)
  constructor(@InjectEntityManager() private db: EntityManager) {}

  private async runJob(job: BaseJob, instanceId?: string) {
    const lockInstance = async () => {
      if (instanceId) {
        try {
          await this.db.save(JobInstance, {
            name: job.constructor.name,
            instanceId: instanceId,
            status: JobStatus.PENDING,
          })
        } catch (e) {
          const instances = await this.db.find(JobInstance, {
            where: { name: job.constructor.name, instanceId: instanceId },
          })
          if (!instances.length) throw e
        }
      }
    }
    const finalizeInstance = async (status: JobStatus, output?: string) => {
      await this.db.update(
        JobInstance,
        { instanceId, name: job.constructor.name },
        { status, output }
      )
    }
    const label = `job ${job.constructor.name}${
      instanceId ? ` with instance id ${instanceId}` : ``
    }`
    try {
      const label = `job ${job.constructor.name}${
        instanceId ? ` with instance id ${instanceId}` : ``
      }`
      this.logger.log(`running ${label}`)
      await lockInstance()
      const output = await job.run()
      await finalizeInstance(JobStatus.FINISHED, output)
      this.logger.log(`${label} finished`)
    } catch (e) {
      this.logger.warn(`${label} errored!`)
      this.logger.warn(e)
      finalizeInstance(JobStatus.ERRORED, e.message)
    }
  }

  private async setCronForJob(job: BaseJob) {
    if (job.interval) {
      while (job.interval.hasNext()) {
        const date = job.interval.next()
        await wait(date.getTime() - Date.now())
        await this.runJob(job, date.toString())
      }
    }
  }

  async onApplicationBootstrap() {
    const jobs = Object.values(Jobs)
    jobs.forEach(Job => {
      const job = new Job(this.db)
      this.setCronForJob(job)
      if (job.immediate) this.runJob(job)
    })
  }

  async initAdmin() {}
}
