import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Timestamp } from './common';

import { User } from './user';

@Schema()
export class Credential extends Timestamp {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: `User` })
  user!: User;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
