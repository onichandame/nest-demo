import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JobStatus } from '@kesci/constants';

import { Persistent } from '../common';

@Schema()
export class JobRecord extends Persistent {
  @Prop({ required: true })
  job!: string;

  @Prop({ required: true, enum: JobStatus })
  status!: JobStatus;

  @Prop()
  output?: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: `JobRecord`,
    unique: true,
  })
  prev?: JobRecord;
}

export const JobRecordSchema = SchemaFactory.createForClass(JobRecord);
