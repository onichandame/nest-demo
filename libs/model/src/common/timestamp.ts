import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: `CreatedAt`, updatedAt: `UpdatedAt` } })
export class Timestamp {
  @Prop()
  CreatedAt!: Date;

  @Prop()
  UpdatedAt!: Date;
}
