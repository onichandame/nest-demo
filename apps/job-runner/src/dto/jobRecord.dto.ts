import { ID, Field, ObjectType, Directive } from '@nestjs/graphql';
import { ISODate } from '@kesci/graphql';
import { JobRecord, Id, StripDocumentProperties } from '@kesci/model';
import { JobStatus } from '@kesci/constants';

@ObjectType(`JobRecord`)
@Directive(`@key(fields: "_id")`)
export class JobRecordDTO implements StripDocumentProperties<JobRecord> {
  @Field(() => ID)
  _id: Id;
  @Field() job: string;
  @Field(() => JobStatus) status: JobStatus;
  @Field() Deleted: boolean;
  @Field(() => ISODate) CreatedAt: Date;
  @Field(() => ISODate) UpdatedAt: Date;
}
