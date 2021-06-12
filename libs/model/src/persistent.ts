import { prop } from '@typegoose/typegoose';

import { Timestamp } from './timestamp';

export abstract class Persistent extends Timestamp {
  @prop({ default: false })
  Deleted!: boolean;
}
