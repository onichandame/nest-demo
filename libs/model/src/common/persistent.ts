import { Prop, Schema } from '@nestjs/mongoose';

import { Timestamp } from './timestamp';

@Schema()
export class Persistent extends Timestamp {
  @Prop({ default: false })
  Deleted!: boolean;
}
