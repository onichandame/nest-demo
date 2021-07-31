import { User } from "@nest-libs/model";
import { NestjsCommon, NestjsTypegoose, Typegoose } from "@nest-libs/deps";

@NestjsCommon.Injectable()
export class AuthService {
  constructor(
    @NestjsTypegoose.InjectModel(User)
    private users: Typegoose.ReturnModelType<typeof User>
  ) {}

  async findUser(id: string) {
    return this.users
      .findById(id)
      .orFail(new Error(`user ${id} not found!`))
      .exec();
  }
}
