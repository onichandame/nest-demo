import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: `CreatedAt`, updatedAt: `UpdatedAt` },
  },
})
export class Timestamp {
  @prop()
  CreatedAt!: Date;

  @prop()
  UpdatedAt!: Date;
}
