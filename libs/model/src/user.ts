import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Persistent } from './common';

@Schema()
export class User extends Persistent {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: false })
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index(
  { name: 1 },
  { unique: true, partialFilterExpression: { Deleted: false } }
);
UserSchema.index(
  { email: 1 },
  { sparse: true, unique: true, partialFilterExpression: { Deleted: false } }
);
