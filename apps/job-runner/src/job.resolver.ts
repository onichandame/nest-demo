import { NestjsGraphql, NestjsCommon } from '@nest-libs/deps';
import { AdminRequired } from '@nest-libs/auth';
import { JobStatus } from '@nest-libs/constants';
import { JobRecord } from '@nest-libs/model';

import { AppService } from './app.service';

@NestjsGraphql.ObjectType()
class Record implements Partial<JobRecord> {
  @NestjsGraphql.Field(() => NestjsGraphql.ID)
  id: string;
  @NestjsGraphql.Field()
  job: string;
  @NestjsGraphql.Field()
  status: JobStatus;
}

@NestjsGraphql.Resolver()
export class JobResolver {
  constructor(private svc: AppService) {}

  @NestjsCommon.UseGuards(AdminRequired)
  @NestjsGraphql.Mutation(() => Record)
  async runAJob(@NestjsGraphql.Args(`name`) name: string) {
    const job = this.svc.getJobByName(name);
    const prevRecord = await this.svc.getLastRecord(job);
    return this.svc.runJob(job, prevRecord);
  }
}
