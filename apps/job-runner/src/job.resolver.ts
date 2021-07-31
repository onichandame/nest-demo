import {
  ID,
  Args,
  Mutation,
  Resolver,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminRequired } from '@nest-libs/auth';
import { JobStatus } from '@nest-libs/constants';
import { JobRecord } from '@nest-libs/model';

import { AppService } from './app.service';

@ObjectType()
class Record implements Partial<JobRecord> {
  @Field(() => ID)
  id: string;
  @Field()
  job: string;
  @Field()
  status: JobStatus;
}

@Resolver()
export class JobResolver {
  constructor(private svc: AppService) {}

  @UseGuards(AdminRequired)
  @Mutation(() => Record)
  async runAJob(@Args(`name`) name: string) {
    const job = this.svc.getJobByName(name);
    const prevRecord = await this.svc.getLastRecord(job);
    return this.svc.runJob(job, prevRecord);
  }
}
