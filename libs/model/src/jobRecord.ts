import { prop, Ref } from '@typegoose/typegoose';
import { JobStatus } from '@kesci/constants';

import { Persistent } from './persistent';
import { Job } from './job';

export class JobRecord extends Persistent {
  @prop({ required: true, ref: () => Job })
  job!: Ref<Job>;

  @prop({ required: true, enum: JobStatus })
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
