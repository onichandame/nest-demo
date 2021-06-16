import { defaultClasses, prop, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export abstract class Base implements defaultClasses.Base {
  _id!: Types.ObjectId;
  id!: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: `CreatedAt`, updatedAt: `UpdatedAt` },
  },
})
export abstract class Timestamp extends Base {
  @prop()
  CreatedAt?: Date;

  @prop()
  UpdatedAt?: Date;
}

export abstract class Persistent extends Timestamp {
  @prop()
  DeletedAt?: Date;
}
