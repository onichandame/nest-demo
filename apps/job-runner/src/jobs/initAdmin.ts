import { Injectable } from '@nestjs/common';
import { ROLE } from '@nest-libs/constants';
import {
  Credential,
  User,
  InjectModel,
  ReturnModelType,
} from '@nest-libs/model';

import { ImmediateJob } from './base';

@Injectable()
export class InitAdmin extends ImmediateJob {
  successfulRuns = 1;
  totalRuns = -1;
  fatal = true;
  timeout = 1000 * 60;

  constructor(
    @InjectModel(User) private users: ReturnModelType<typeof User>,
    @InjectModel(Credential)
    private creds: ReturnModelType<typeof Credential>,
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
