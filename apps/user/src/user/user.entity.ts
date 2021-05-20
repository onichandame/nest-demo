import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timestamp } from '@kesci/datatype';

@Schema()
export class User extends Timestamp {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
