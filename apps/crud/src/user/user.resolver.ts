import { NestjsGraphql, Typegoose, NestjsTypegoose } from '@nest-libs/deps';
import { User } from '@nest-libs/model';

import { UserDTO } from './user.dto';

@NestjsGraphql.Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    @NestjsTypegoose.InjectModel(User)
    private users: Typegoose.ReturnModelType<typeof User>,
  ) {}

  @NestjsGraphql.Mutation(() => UserDTO)
  async softDeleteOneUser(
    @NestjsGraphql.Args(`input`, { type: () => NestjsGraphql.ID }) id: string,
  ): Promise<UserDTO> {
    return this.users
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .orFail(new Error(`user ${id} not found!`))
      .exec();
  }
}
