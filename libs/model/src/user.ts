import { prop, index } from '@typegoose/typegoose';
import { ROLE } from '@nest-libs/constants';

import { Persistent } from './base';
import { Credential } from './credential';

@index(
  { name: 1 },
  { partialFilterExpression: { Deleted: false }, unique: true }
)
@index(
  { email: 1 },
  { partialFilterExpression: { Deleted: false }, unique: true }
)
export class User extends Persistent {
  @prop({ required: true, unique: true })
  name!: string;

  @prop({ type: () => [Number], enum: ROLE, default: () => [ROLE.DALIT] })
  roles!: ROLE[];

  @prop({ required: false })
  email?: string;

  @prop({
    localField: `_id`,
    foreignField: `user`,
    ref: () => Credential,
    match: { Deleted: false },
    justOne: true,
  })
  credentials?: Credential[];
}
