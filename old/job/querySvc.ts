import {
  InjectQueryService,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import { Job } from './entity';
import { JobRecord } from '../jobRecord';

export class JobDTOService extends RelationQueryService<Job> {
  constructor(
    @InjectQueryService(JobRecord)
    readonly jobRecordSvc: QueryService<JobRecord>,
    @InjectQueryService(Job) readonly querySvc: QueryService<Job>
  ) {
    super(querySvc, {
      records: {
        service: jobRecordSvc,
        query(job) {
          return { filter: { job: { eq: (job as any)._id } } };
        },
      },
    });
  }
}
