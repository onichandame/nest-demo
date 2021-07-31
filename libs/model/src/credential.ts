import { Typegoose, bcryptjs } from '@nest-libs/deps';

import { Persistent } from './base';

import { User } from './user';

const hashPass = (raw: string) => bcryptjs.hashSync(raw, 4);

@Typegoose.pre<Credential>(`save`, function (next) {
  this.password = hashPass(this.password);
  next();
})
@Typegoose.pre<Credential>(
  [`update`, `updateMany`, `updateOne`, `findOneAndUpdate`],
  function (next) {
    const update = this.getUpdate();
    if (update && !Array.isArray(update) && update.password)
      this.update({ password: hashPass(update.password) });
    next();
  }
)
export class Credential extends Persistent {
  @Typegoose.prop({ required: true, ref: () => User })
  user!: Typegoose.Ref<User>;

  @Typegoose.prop()
  password!: string;

  public validatePass(raw: string) {
    return bcryptjs.compareSync(raw, this.password);
  }
}
