import { Directive, Field, ObjectType } from "@nestjs/graphql";
import { FilterableField } from "@nestjs-query/query-graphql";
import { JobType } from "@kesci/constants";
import { Job, StripDocumentProperties } from "@kesci/model";
import { ISODate } from "@kesci/graphql";

import { JobRecordDTO } from "./jobRecord";

@ObjectType(`Job`)
@Directive(`@key(fields: "_id")`)
export class JobDTO implements StripDocumentProperties<Job> {
  @FilterableField()
  name!: string;
  @FilterableField(() => JobType)
  type!: JobType;
  @Field(() => [JobRecordDTO])
  records?: JobRecordDTO[];
  @FilterableField()
  Deleted!: boolean;
  @FilterableField(() => ISODate)
  CreatedAt!: Date;
  @FilterableField(() => ISODate)
  UpdatedAt!: Date;
}
