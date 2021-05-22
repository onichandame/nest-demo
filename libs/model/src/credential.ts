import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Timestamp } from './common';

import { User } from './user';

@Schema()
export class Credential extends Timestamp {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: `User` })
  user!: User;
  @Prop()
  password?: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
