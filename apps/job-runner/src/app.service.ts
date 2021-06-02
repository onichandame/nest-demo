import { Logger, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { JobStatus } from '@kesci/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { waitTil } from '@kesci/miscellaneous';
import { JobRecord } from '@kesci/model';

import { BaseJob, BaseCronJob, BaseIntervalJob } from './jobs/base';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger = new Logger(AppService.name);
  private cronJobs = new Set<BaseCronJob>();
  private intervalJobs = new Set<BaseIntervalJob>();

  constructor(
    @InjectModel(JobRecord.name) private jobRecords: Model<JobRecord>,
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
    id: string,
    status: JobStatus.ERROR | JobStatus.FINISHED,
    output: string,
  ) {
    return await this.jobRecords
      .findOneAndUpdate(
        { _id: id, status: JobStatus.PENDING },
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

  private async runJob(job: BaseJob, record: string) {
    try {
      const result = await job.run();
      await this.closeRecord(
        record,
        JobStatus.FINISHED,
        JSON.stringify(result),
      );
    } catch (e) {
      await this.closeRecord(
        record,
        JobStatus.FINISHED,
        JSON.stringify(e.message),
      );
    }
  }

  private loadJobs() {
    this.cronJobs.clear();
    this.intervalJobs.clear();
    const Jobs: { [key: string]: { new (): BaseJob } } = require(`./jobs`);
    for (const Job of Object.values(Jobs)) {
      const job = new Job();
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
        const record = await this.initRecord(job.name, prevRecord);
        if (record) {
          await this.runJob(job, record.id.toString());
        }
      }
    }
  }

  private async bootstrapIntervalJob(job: BaseIntervalJob) {
    while (true) {
      const count = await this.countRecords(job);
      if (job.isOverLimit(count)) break;
      const prevRecord = await this.getLastRecord(job);
      const nextTick = new Date(prevRecord.CreatedAt.getTime() + job.interval);
      await waitTil(nextTick);
      const record = await this.initRecord(job.name, prevRecord);
      if (record) {
        try {
          await this.runJob(job, record.id.toString());
        } catch (e) {}
      }
    }
  }

  onApplicationBootstrap() {
    this.loadJobs();
    this.cronJobs.forEach((job) => this.bootstrapCronJob(job));
    this.intervalJobs.forEach((job) => this.bootstrapIntervalJob(job));
  }
}
