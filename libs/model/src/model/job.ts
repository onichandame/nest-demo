import { prop } from '@typegoose/typegoose';
import {
  FilterableField,
  FilterableCursorConnection,
} from '@nestjs-query/query-graphql';
import { ObjectType, Directive } from '@nestjs/graphql';
import { JobType } from '@kesci/constants';

import { Persistent } from './persistent';
import { JobRecord } from './jobRecord';

@ObjectType(`Job`)
@Directive(`@key(fields: "_id")`)
@FilterableCursorConnection(`records`, () => JobRecord, {
  disableRemove: true,
  disableUpdate: true,
})
export class Job extends Persistent {
  @FilterableField()
  @prop({ required: true, unique: true })
  name!: string;

  @FilterableField(() => JobType)
  @prop({ required: true, enum: JobType })
  type!: JobType;

  @prop({ ref: () => JobRecord, foreignField: `job`, localField: `_id` })
  records?: JobRecord[];
}
