import { ID, ObjectType, Directive } from '@nestjs/graphql';
import { ISODate } from '@kesci/graphql';
import { JobRecord, Id, StripDocumentProperties } from '@kesci/model';
import { JobStatus } from '@kesci/constants';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType(`JobRecord`)
@Directive(`@key(fields: "_id")`)
export class JobRecordDTO implements StripDocumentProperties<JobRecord> {
  @FilterableField(() => ID)
  _id: Id;
  @FilterableField() job: string;
  @FilterableField(() => JobStatus) status: JobStatus;
  @FilterableField() Deleted: boolean;
  @FilterableField(() => ISODate) CreatedAt: Date;
  @FilterableField(() => ISODate) UpdatedAt: Date;
}
