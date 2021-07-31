import { Typegoose, mongoose } from '@nest-libs/deps';

export abstract class Base implements Typegoose.defaultClasses.Base {
  _id!: mongoose.Types.ObjectId;
  id!: string;
}

@Typegoose.modelOptions({
  schemaOptions: {
    timestamps: { createdAt: `createdAt`, updatedAt: `updatedAt` },
  },
})
export abstract class Timestamp extends Base {
  @Typegoose.prop()
  createdAt!: Date;

  @Typegoose.prop()
  updatedAt!: Date;
}

export class Persistent extends Timestamp {
  @Typegoose.prop()
  deletedAt?: Date;

  static softDelete(
    this: Typegoose.ReturnModelType<typeof Persistent>,
    id: string
  ) {
    return this.findByIdAndUpdate(id, { deletedAt: new Date() });
  }
}
