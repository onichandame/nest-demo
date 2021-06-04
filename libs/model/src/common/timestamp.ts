import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: `CreatedAt`, updatedAt: `UpdatedAt` } })
export class Timestamp extends Document<Types.ObjectId> {
  @Prop()
  CreatedAt!: Date;

  @Prop()
  UpdatedAt!: Date;
}
