import { NestjsCommon, NestjsTypegoose, Typegoose } from '@nest-libs/deps';
import { ROLE } from '@nest-libs/constants';
import { Credential, User } from '@nest-libs/model';

import { ImmediateJob } from './base';

@NestjsCommon.Injectable()
export class InitAdmin extends ImmediateJob {
  successfulRuns = 1;
  totalRuns = -1;
  fatal = true;
  timeout = 1000 * 60;

  constructor(
    @NestjsTypegoose.InjectModel(User)
    private users: Typegoose.ReturnModelType<typeof User>,
    @NestjsTypegoose.InjectModel(Credential)
    private creds: Typegoose.ReturnModelType<typeof Credential>,
  ) {
    super();
  }

  async run() {
    const adminCount = await this.users.countDocuments({ roles: ROLE.BRAHMIN });
    if (!adminCount) {
      const user = await this.users.create({
        roles: [ROLE.BRAHMIN],
        name: `admin`,
      });
      await this.creds.create({ user, password: `admin` });
    }
  }
}
