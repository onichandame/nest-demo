import { Ref, prop } from '@typegoose/typegoose';
import { JobType, JobStatus } from '@nest-libs/constants';

import { Persistent } from './base';

export class Job extends Persistent {
  @prop({ required: true, unique: true })
  name!: string;

  @prop({ required: true, enum: JobType })
  type!: JobType;

  @prop({ ref: () => JobRecord, foreignField: `job`, localField: `_id` })
  records?: Ref<JobRecord>[];
}

export class JobRecord extends Persistent {
  @prop({ required: true, ref: () => Job })
  job!: Ref<Job>;

  @prop({ required: true, enum: JobStatus, default: () => JobStatus.PENDING })
  status!: JobStatus;

  @prop()
  output?: string;

  @prop({
    required: false,
    ref: () => JobRecord,
    unique: true,
  })
  prev?: Ref<JobRecord>;
}
