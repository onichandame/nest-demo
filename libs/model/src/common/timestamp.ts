import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: `CreatedAt`, updatedAt: `UpdatedAt` } })
export class Timestamp extends Document {
  @Prop()
  CreatedAt!: Date;

  @Prop()
  UpdatedAt!: Date;
}
