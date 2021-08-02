import {
  NestjsCommon,
  NestjsGraphql,
  NestjsTypegoose,
  Typegoose,
} from "@nest-libs/deps";
import { SessionService } from "@nest-libs/auth";
import { User } from "@nest-libs/model";

@NestjsGraphql.InputType()
class LoginInput {
  @NestjsGraphql.Field()
  nameOrEmail: string;
  @NestjsGraphql.Field()
  password: string;
}

@NestjsGraphql.Resolver()
export class LoginResolver {
  constructor(
    @NestjsTypegoose.InjectModel(User)
    private users: Typegoose.ReturnModelType<typeof User>,
    @NestjsCommon.Inject(SessionService) private sess: SessionService
  ) {}

  @NestjsGraphql.Mutation(() => String)
  async login(@NestjsGraphql.Args(`input`) input: LoginInput): Promise<string> {
    const user =
      (await this.users
        .findOne({ name: input.nameOrEmail })
        .populate(`credentials`)
        .exec()) ||
      (await this.users
        .findOne({ email: input.nameOrEmail })
        .populate(`credentials`)
        .exec());
    if (!user) throw new Error(`user ${input.nameOrEmail} not found!`);
    if (!user.credentials || !user.credentials.length)
      throw new Error(`user ${user.id} has no active credential!`);
    if (!user.credentials.some((cred) => cred.validatePass(input.password)))
      throw new Error(`user ${user.id} failed authentication`);
    return this.sess.serilize(user.id);
  }
}
