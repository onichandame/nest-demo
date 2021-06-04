import {
  Inject,
  Logger,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { JobStatus } from '@kesci/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { waitTil } from '@kesci/miscellaneous';
import { JobRecord } from '@kesci/model';

import { BaseJob, BaseCronJob, BaseIntervalJob } from './jobs/base';
import { JobsToken } from './constants';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger = new Logger(AppService.name);
  private cronJobs = new Set<BaseCronJob>();
  private intervalJobs = new Set<BaseIntervalJob>();

  constructor(
    @InjectModel(JobRecord.name) private jobRecords: Model<JobRecord>,
    @Inject(JobsToken) private jobs: BaseJob[],
  ) {}

  private async initRecord(job: string, prev?: JobRecord) {
    try {
      return await this.jobRecords.create({
        job,
        prev,
        status: JobStatus.PENDING,
      });
    } catch (e) {
      this.logger.debug(e.message);
      return null;
    }
  }

  private async closeRecord(
    record: JobRecord,
    status: JobStatus.ERROR | JobStatus.FINISHED,
    output: string,
  ) {
    return await this.jobRecords
      .findOneAndUpdate(
        { _id: record.id, status: JobStatus.PENDING },
        { status, output },
      )
      .exec();
  }

  private getFilter(job: BaseJob) {
    return { job: job.name };
  }

  private async getLastRecord(job: BaseJob) {
    return this.jobRecords
      .findOne(this.getFilter(job), {}, { sort: { CreatedAt: -1 } })
      .exec();
  }

  private async countRecords(job: BaseJob) {
    return this.jobRecords.count(this.getFilter(job)).exec();
  }

  private async runJob(job: BaseJob, prevRecord?: JobRecord) {
    const record = await this.initRecord(job.name, prevRecord);
    this.logger.log(`job ${job.name} started`);
    try {
      const result = await job.run();
      await this.closeRecord(
        record,
        JobStatus.FINISHED,
        JSON.stringify(result),
      );
      this.logger.log(`job ${job.name} finished`);
    } catch (e) {
      await this.closeRecord(
        record,
        JobStatus.FINISHED,
        JSON.stringify(e.message),
      );
      this.logger.log(`job ${job.name} failed with error: ${e.message}`);
    }
  }

  private loadJobs() {
    this.cronJobs.clear();
    this.intervalJobs.clear();
    for (const job of Object.values(this.jobs)) {
      if (job instanceof BaseCronJob) this.cronJobs.add(job);
      else if (job instanceof BaseIntervalJob) this.intervalJobs.add(job);
    }
  }

  private async bootstrapCronJob(job: BaseCronJob) {
    while (job.interval.hasNext()) {
      const date = job.interval.next().toDate();
      const prevRecord = await this.getLastRecord(job);
      const count = await this.countRecords(job);
      if (job.isOverLimit(count)) break;
      if (!job.hasBeenRun(date, prevRecord)) {
        await waitTil(date);
        await this.runJob(job, prevRecord);
      }
    }
  }

  private async bootstrapIntervalJob(job: BaseIntervalJob) {
    while (true) {
      const count = await this.countRecords(job);
      if (job.isOverLimit(count)) break;
      const prevRecord = await this.getLastRecord(job);
      if (prevRecord) {
        const nextTick = new Date(
          prevRecord.CreatedAt.getTime() + job.interval,
        );
        await waitTil(nextTick);
      }
      await this.runJob(job, prevRecord);
    }
  }

  onApplicationBootstrap() {
    this.loadJobs();
    this.cronJobs.forEach((job) => this.bootstrapCronJob(job));
    this.intervalJobs.forEach((job) => this.bootstrapIntervalJob(job));
  }
}
