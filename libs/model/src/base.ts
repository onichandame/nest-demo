import {
  ReturnModelType,
  defaultClasses,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
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

export class Persistent extends Timestamp {
  @prop()
  deletedAt?: Date;

  static softDelete(this: ReturnModelType<typeof Persistent>, id: string) {
    return this.findByIdAndUpdate(id, { deletedAt: new Date() });
  }
}
