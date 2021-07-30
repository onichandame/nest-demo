import { index, Ref, prop } from '@typegoose/typegoose';
import { JobStatus } from '@nest-libs/constants';

import { Persistent } from './base';

@index<JobRecord>({ job: 1 })
export class JobRecord extends Persistent {
  @prop({ required: true })
  job!: string;

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
