import { Typegoose } from '@nest-libs/deps';
import { JobStatus } from '@nest-libs/constants';

import { Persistent } from './base';

@Typegoose.index<JobRecord>({ job: 1 })
export class JobRecord extends Persistent {
  @Typegoose.prop({ required: true })
  job!: string;

  @Typegoose.prop({
    required: true,
    enum: JobStatus,
    default: () => JobStatus.PENDING,
  })
  status!: JobStatus;

  @Typegoose.prop()
  output?: string;

  @Typegoose.prop({
    required: false,
    ref: () => JobRecord,
    unique: true,
  })
  prev?: Typegoose.Ref<JobRecord>;
}
