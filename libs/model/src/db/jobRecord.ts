import { prop, Ref } from '@typegoose/typegoose';
import { JobStatus } from '@kesci/constants';

import { Persistent } from './persistent';

export class JobRecord extends Persistent {
  @prop({ required: true })
  job!: string;

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
