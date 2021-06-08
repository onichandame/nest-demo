import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExternalJobRecord } from '@kesci/model';

import { AppService } from './app.service';

@Resolver()
export class JobResolver {
  constructor(private svc: AppService) {}

  @Mutation(() => ExternalJobRecord)
  async runAJob(@Args(`name`) name: string) {
    const job = this.svc.getJob(name);
    const prevRecord = await this.svc.getLastRecord(job);
    return this.svc.runJob(job, prevRecord);
  }
}
