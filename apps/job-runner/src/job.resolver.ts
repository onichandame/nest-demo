import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JobRecord, Model } from '@kesci/model';
import { InjectModel } from 'nestjs-typegoose';

import { AppService } from './app.service';
import { JobDTO, JobRecordDTO } from './dto';

@Resolver()
export class JobResolver {
  constructor(
    private svc: AppService,
    @InjectModel(JobRecord)
    private jobRecords: Model<JobRecord>,
  ) {}

  @Query(() => [JobDTO], { name: `jobs` })
  async jobs() {
    const runnedJobs = await this.jobRecords.find().distinct(`job`).exec();
    const result: JobDTO[] = [];
    runnedJobs.forEach((job) => result.push({ name: job, runnable: false }));
    this.svc.currentJobs.forEach((job) => {
      const runnedJob = result.find((j) => j.name === job.name);
      if (runnedJob) runnedJob.runnable = true;
      else result.push({ name: job.name, runnable: true });
    });
    return result;
  }

  @Mutation(() => JobRecordDTO)
  async runAJob(@Args(`name`) name: string) {
    const job = this.svc.getJob(name);
    const prevRecord = await this.svc.getLastRecord(job);
    return this.svc.runJob(job, prevRecord);
  }
}
