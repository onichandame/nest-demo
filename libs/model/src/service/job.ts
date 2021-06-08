import {
  InjectQueryService,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import { JobRecord, Job } from '../model';

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
