import { prop, Ref, pre } from '@typegoose/typegoose';
import { hashSync, compareSync } from 'bcryptjs';

import { Timestamp } from '../timestamp';

import { User } from '../user';

const hashPass = (raw: string) => hashSync(raw, 4);

@pre<Credential>(`save`, function (next) {
  this.password = hashPass(this.password);
  next();
})
@pre<Credential>(
  [`update`, `updateMany`, `updateOne`, `findOneAndUpdate`],
  function (next) {
    const update = this.getUpdate();
    type UpdateBodyWithPass = Extract<typeof update, { password?: string }>;
    const isUpdateBodyWithPass = (raw: any): raw is UpdateBodyWithPass =>
      !!raw.password && typeof raw.password === `string`;
    if (isUpdateBodyWithPass(update) && update.password) {
      this.setUpdate({ ...update, password: hashPass(update.password) });
    }
    next();
  }
)
export class Credential extends Timestamp {
  @prop({ required: true, ref: () => User })
  user!: Ref<User>;

  @prop()
  password!: string;

  public validatePass(this: Credential, raw: string) {
    return compareSync(raw, this.password);
  }
}
