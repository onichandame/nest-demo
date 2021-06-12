import { prop, modelOptions } from '@typegoose/typegoose';

import { Base } from './base';

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: `CreatedAt`, updatedAt: `UpdatedAt` },
  },
})
export abstract class Timestamp extends Base {
  @prop()
  CreatedAt!: Date;

  @prop()
  UpdatedAt!: Date;
}
