import {
  CronParser,
  NestjsTypegoose,
  Typegoose,
  NestjsCommon,
  NestjsSchedule,
} from '@nest-libs/deps';
import { JobStatus } from '@nest-libs/constants';
import { JobRecord } from '@nest-libs/model';

import { JobsToken, BaseJob } from './jobs';

@NestjsCommon.Injectable()
export class AppService implements NestjsCommon.OnApplicationBootstrap {
  private logger = new NestjsCommon.Logger(AppService.name);

  constructor(
    @NestjsTypegoose.InjectModel(JobRecord)
    private jobRecordCol: Typegoose.ReturnModelType<typeof JobRecord>,
    @NestjsCommon.Inject(JobsToken) private jobs: BaseJob[],
  ) {}

  private async initRecord(
    job: BaseJob,
    prev?: Typegoose.DocumentType<JobRecord>,
  ) {
    try {
      return await this.jobRecordCol.create({
        job: job.name,
        prev,
        status: JobStatus.PENDING,
      });
    } catch (e) {
      this.logger.debug(e.message);
      return null;
    }
  }

  private async closeRecord(
    record: Typegoose.DocumentType<JobRecord>,
    status: JobStatus.ERROR | JobStatus.FINISHED,
    output: string,
  ) {
    return await this.jobRecordCol
      .findByIdAndUpdate(record.id, { status, output }, { new: true })
      .exec();
  }

  getJobByName(name: string) {
    for (const job of this.currentJobs) {
      if (job.name === name) return job;
    }
    throw new Error(`cannot find job ${name}!`);
  }

  async getLastRecord(job: BaseJob) {
    return await this.jobRecordCol
      .findOne({ job: job.name }, {}, { sort: `-createdAt` })
      .exec();
  }

  get currentJobs() {
    return this.jobs;
  }

  async getRunJobs() {
    return (await this.jobRecordCol.distinct(`job`).exec()) as string[];
  }

  async runJob(job: BaseJob, prevRecord?: Typegoose.DocumentType<JobRecord>) {
    if (job.totalRuns >= 0) {
      const totalRuns = await this.jobRecordCol
        .countDocuments({ job: job.name })
        .exec();
      if (totalRuns >= job.totalRuns) return;
    }
    if (job.successfulRuns >= 0) {
      const successfulRuns = await this.jobRecordCol
        .countDocuments({
          job: job.name,
          status: { $in: [JobStatus.FINISHED, JobStatus.PENDING] },
        })
        .exec();
      if (successfulRuns >= job.successfulRuns) return;
    }
    let record = await this.initRecord(job, prevRecord);
    if (!record) return;
    this.logger.log(`job ${job.name} started! recorded as ${record.id}`);
    let result: string;
    let success: boolean;
    try {
      result = JSON.stringify(await job.run());
      success = true;
    } catch (e) {
      this.logger.warn(e);
      result = e.message;
      success = false;
    }
    record = await this.closeRecord(
      record,
      JobStatus[success ? `FINISHED` : `ERROR`],
      result,
    );
    this.logger.log(
      `job ${job.name} ${success ? `finished` : `failed`} in run ${record.id}`,
    );
    if (job.fatal && !success)
      throw new Error(`job ${job.name} failed fatally!`);
    return record;
  }

  async onApplicationBootstrap() {
    const loadAJob = async (job: BaseJob) => {
      if (job.immediate) {
        this.runJob(job, await this.getLastRecord(job));
      }
      if (job.interval) {
        setInterval(async () => {
          const prev = await this.getLastRecord(job);
          if (
            prev &&
            Date.now() - prev.createdAt.getTime() > job.interval - 1000
          )
            this.runJob(job, prev);
        }, job.interval);
      }
      if (job.cron) {
        const cron = CronParser.parseExpression(job.cron);
        const runNext = () => {
          setTimeout(async () => {
            const prev = await this.getLastRecord(job);
            if (
              prev &&
              prev.createdAt.getTime() - 1000 < cron.prev().toDate().getTime()
            )
              this.runJob(job, prev);
            runNext();
          }, cron.next().toDate().getTime() - Date.now());
        };
        runNext();
      }
    };
    await Promise.all(this.currentJobs.map((v) => loadAJob(v)));
  }

  @NestjsSchedule.Interval(1000 * 60 * 5)
  async audit() {
    const cursor = this.jobRecordCol
      .find({ status: JobStatus.PENDING })
      .cursor();
    for await (const record of cursor) {
      const job = this.getJobByName(record.job);
      if (Date.now() - record.createdAt.getTime() >= job.timeout) {
        record
          .updateOne({ status: JobStatus.ERROR, output: `timed out` })
          .exec();
      }
    }
  }
}
