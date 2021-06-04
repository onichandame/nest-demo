import { Directive, Resolver, Query, ObjectType, Field } from '@nestjs/graphql';
import { Model } from 'mongoose';
import { JobRecord } from '@kesci/model';
import { InjectModel } from '@nestjs/mongoose';

@ObjectType()
@Directive(`@key(fields: "name")`)
class Job {
  @Field()
  name: string;
  @Field()
  runnable: boolean;
}

@Resolver()
export class JobResolver {
  constructor(
    @InjectModel(JobRecord.name) private jobRecords: Model<JobRecord>,
  ) {}

  @Query(() => [Job])
  async listJobs() {
    const runnedJobs = await this.jobRecords.find().distinct(`job`).exec();
    const currentJobs = Object.keys(require(`./jobs`));
    const result: Job[] = [];
    runnedJobs.forEach((job) => result.push({ name: job, runnable: false }));
    currentJobs.forEach((job) => {
      const runnedJob = result.find((j) => j.name === job);
      if (runnedJobs) runnedJob.runnable = true;
      else result.push({ name: job, runnable: true });
    });
    return result;
  }
}
