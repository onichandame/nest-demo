import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JobRecordDTO, JobDTO } from '@kesci/dto';

import { AppService } from './app.service';

@Resolver(() => JobDTO)
export class JobResolver {
  constructor(private svc: AppService) {}

  @Mutation(() => JobRecordDTO)
  async runAJob(@Args(`name`) name: string) {
    const job = this.svc.getJob(name);
    const prevRecord = await this.svc.getLastRecord(job);
    return this.svc.runJob(job, prevRecord);
  }
}
