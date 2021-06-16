import { prop, Ref, pre } from '@typegoose/typegoose';
import { hashSync, compareSync } from 'bcryptjs';

import { Persistent } from './base';

import { User } from './user';

const hashPass = (raw: string) => hashSync(raw, 4);

@pre<Credential>(`save`, function (next) {
  this.password = hashPass(this.password);
  next();
})
@pre<Credential>(
  [`update`, `updateMany`, `updateOne`, `findOneAndUpdate`],
  function (next) {
    const update = this.getUpdate();
    if (update && !Array.isArray(update) && update.password)
      this.update({ password: hashPass(update.password) });
    next();
  }
)
export class Credential extends Persistent {
  @prop({ required: true, ref: () => User })
  user!: Ref<User>;

  @prop()
  password!: string;

  public validatePass(raw: string) {
    return compareSync(raw, this.password);
  }
}
