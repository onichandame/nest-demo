import { Typegoose } from '@nest-libs/deps';
import { ROLE } from '@nest-libs/constants';

import { Persistent } from './base';
import { Credential } from './credential';

@Typegoose.index(
  { name: 1 },
  { partialFilterExpression: { Deleted: false }, unique: true }
)
@Typegoose.index(
  { email: 1 },
  { partialFilterExpression: { Deleted: false }, unique: true }
)
export class User extends Persistent {
  @Typegoose.prop({ required: true, unique: true })
  name!: string;

  @Typegoose.prop({
    type: () => [Number],
    enum: ROLE,
    default: () => [ROLE.DALIT],
  })
  roles!: ROLE[];

  @Typegoose.prop({ required: false })
  email?: string;

  @Typegoose.prop({
    localField: `_id`,
    foreignField: `user`,
    ref: () => Credential,
    match: { Deleted: false },
    justOne: true,
  })
  credentials?: Credential[];
}
