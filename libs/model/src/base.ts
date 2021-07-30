import { defaultClasses, prop, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export abstract class Base implements defaultClasses.Base {
  _id!: Types.ObjectId;
  id!: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: `createdAt`, updatedAt: `updatedAt` },
  },
})
export abstract class Timestamp extends Base {
  @prop()
  createdAt!: Date;

  @prop()
  updatedAt!: Date;
}

export abstract class Persistent extends Timestamp {
  @prop()
  deletedAt?: Date;
}
