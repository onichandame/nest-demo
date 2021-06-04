import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync, compareSync } from 'bcryptjs';
import mongoose from 'mongoose';

import { Timestamp } from '../common';

import { User } from '../user';

@Schema()
export class Credential extends Timestamp {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: `User` })
  user!: User;
  @Prop()
  password!: string;

  validatePass!: (this: Credential, raw: string) => boolean;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);

const hashPass = (raw: string) => hashSync(raw, 4);
function preHook(this: Credential, next: () => void) {
  this.password = hashPass(this.password);
  next();
}
CredentialSchema.pre(`save`, preHook);
CredentialSchema.pre(`updateOne`, preHook);
CredentialSchema.methods.validatePass = function (this, raw) {
  return compareSync(raw, this.password);
} as Credential['validatePass'];
