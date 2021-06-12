import { prop, Ref } from '@typegoose/typegoose';
import { Relation, FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType, Directive } from '@nestjs/graphql';
import { JobStatus } from '@kesci/constants';

import { Persistent } from '../persistent';
import { Job } from '../job';

@ObjectType(`JobRecord`)
@Directive(`@key(fields: "_id")`)
@Relation(`job`, () => Job)
@Relation(`prev`, () => JobRecord)
export class JobRecord extends Persistent {
  @prop({ required: true, ref: () => Job })
  job!: Ref<Job>;

  @FilterableField(() => JobStatus)
  @prop({ required: true, enum: JobStatus })
  status!: JobStatus;

  @FilterableField()
  @prop()
  output?: string;

  @prop({
    required: false,
    ref: () => JobRecord,
    unique: true,
  })
  prev?: Ref<JobRecord>;
}
