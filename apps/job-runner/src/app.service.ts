import {
  Inject,
  Logger,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { JobStatus } from '@kesci/constants';
import { InjectModel } from 'nestjs-typegoose';
import { waitTil } from '@kesci/miscellaneous';
import { Model, JobRecord, Document } from '@kesci/model';

import { JobsToken, BaseJob, BaseCronJob, BaseIntervalJob } from './jobs';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger = new Logger(AppService.name);
  private cronJobs = new Set<BaseCronJob>();
  private intervalJobs = new Set<BaseIntervalJob>();

  constructor(
    @InjectModel(JobRecord)
    private jobRecords: Model<JobRecord>,
    @Inject(JobsToken) private jobs: BaseJob[],
  ) {}

  private async initRecord(job: string, prev?: Document<JobRecord>) {
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
    record: Document<JobRecord>,
    status: JobStatus.ERROR | JobStatus.FINISHED,
    output: string,
  ) {
    return await this.jobRecords
      .findOneAndUpdate(
        { _id: record.id, status: JobStatus.PENDING },
        { status, output },
        { new: true },
      )
      .exec();
  }

  private getFilter(job: BaseJob) {
    return { job: job.name };
  }

  async getLastRecord(job: BaseJob) {
    return this.jobRecords
      .findOne(this.getFilter(job), {}, { sort: { CreatedAt: -1 } })
      .exec();
  }

  get currentJobs() {
    return this.jobs;
  }

  private async countRecords(job: BaseJob) {
    return this.jobRecords.count(this.getFilter(job)).exec();
  }

  async runJob(job: BaseJob, prevRecord?: Document<JobRecord>) {
    let record = await this.initRecord(job.name, prevRecord);
    this.logger.log(`job ${job.name} started`);
    try {
      const result = await job.run();
      record = await this.closeRecord(
        record,
        JobStatus.FINISHED,
        JSON.stringify(result),
      );
      this.logger.log(`job ${job.name} finished`);
    } catch (e) {
      record = await this.closeRecord(
        record,
        JobStatus.FINISHED,
        JSON.stringify(e.message),
      );
      this.logger.log(`job ${job.name} failed with error: ${e.message}`);
    }
    return record;
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

  getJob(name: string) {
    const job = this.jobs.find((j) => j.name === name);
    return job;
  }

  onApplicationBootstrap() {
    this.loadJobs();
    this.cronJobs.forEach((job) => this.bootstrapCronJob(job));
    this.intervalJobs.forEach((job) => this.bootstrapIntervalJob(job));
  }
}
