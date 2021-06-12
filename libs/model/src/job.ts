import { prop } from '@typegoose/typegoose';
import { JobType } from '@kesci/constants';

import { Persistent } from './persistent';
import { JobRecord } from './jobRecord';

export class Job extends Persistent {
  @prop({ required: true, unique: true })
  name!: string;

  @prop({ required: true, enum: JobType })
  type!: JobType;

  @prop({ ref: () => JobRecord, foreignField: `job`, localField: `_id` })
  records?: JobRecord[];
}
