import {
  Inject,
  Logger,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { JobStatus, JobType } from '@kesci/constants';
import { InjectModel } from 'nestjs-typegoose';
import { waitTil } from '@kesci/miscellaneous';
import { Model, Job, JobRecord, Document } from '@kesci/model';

import { JobsToken, BaseJob, BaseCronJob, BaseIntervalJob } from './jobs';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger = new Logger(AppService.name);

  constructor(
    @InjectModel(JobRecord)
    private jobRecordCol: Model<JobRecord>,
    @InjectModel(Job)
    private jobCol: Model<Job>,
    @Inject(JobsToken) private jobs: BaseJob[],
  ) {}

  private async initRecord(job: Job, prev?: Document<JobRecord>) {
    try {
      return await this.jobRecordCol.create({
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
    return await this.jobRecordCol
      .findOneAndUpdate(
        { _id: record.id, status: JobStatus.PENDING },
        { status, output },
        { new: true },
      )
      .exec();
  }

  async getLastRecord(job: BaseJob) {
    return this.jobRecordCol
      .findOne(
        { job: await this.getData(job) },
        {},
        { sort: { CreatedAt: -1 } },
      )
      .exec();
  }

  get currentJobs() {
    return this.jobs;
  }

  private async countRecords(job: BaseJob) {
    return this.jobRecordCol
      .countDocuments({ job: await this.getData(job) })
      .exec();
  }

  private async getData(job: BaseJob) {
    return this.jobCol
      .findOne({ name: job.name })
      .orFail(new Error(`job ${job.name} not loaded in database`))
      .exec();
  }

  async runJob(job: BaseJob, prevRecord?: Document<JobRecord>) {
    let record = await this.initRecord(await this.getData(job), prevRecord);
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

  private getJobClass(job: BaseJob) {
    if (job instanceof BaseCronJob) return BaseCronJob;
    else if (job instanceof BaseIntervalJob) return BaseIntervalJob;
    else return BaseJob;
  }

  private getJobType(job: BaseJob) {
    const cls = this.getJobClass(job);
    switch (cls) {
      case BaseCronJob:
        return JobType.CRON;
      case BaseIntervalJob:
        return JobType.INTERVAL;
      default:
        throw new Error(`type of job ${job.name} not recognized!`);
    }
  }

  private async auditJobs() {
    await Promise.all([
      Promise.all(
        this.jobs.map((job) =>
          this.jobCol
            .findOneAndUpdate(
              { name: job.name },
              {
                name: job.name,
                type: this.getJobType(job),
                Deleted: false,
              },
              { upsert: true },
            )
            .exec(),
        ),
      ),
      this.jobCol
        .find()
        .where({ name: { $nin: this.jobs.map((v) => v.name) } })
        .updateMany({ Deleted: true })
        .exec(),
    ]);
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

  private getJobImpl(j: Job) {
    const result = this.jobs.find((job) => job.name === j.name);
    if (result) return result;
    else throw new Error(`job ${j.name} not implemented`);
  }

  private async loadJobs() {
    await this.auditJobs();

    const jobs = await this.jobCol.find({ Deleted: false }).exec();
    jobs.forEach((job) => {
      const impl = this.getJobImpl(job);
      if (impl instanceof BaseCronJob) this.bootstrapCronJob(impl);
      else if (impl instanceof BaseIntervalJob) this.bootstrapIntervalJob(impl);
      else throw new Error(`job type ${job.type} not supported!`);
    });
  }

  async onApplicationBootstrap() {
    await this.loadJobs();
  }
}
