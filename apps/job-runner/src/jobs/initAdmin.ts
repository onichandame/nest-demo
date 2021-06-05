import { Injectable } from '@nestjs/common';
import { ROLE } from '@kesci/constants';
import { InjectModel } from 'nestjs-typegoose';
import { Model, Credential, User } from '@kesci/model';

import { BaseNceJob } from './base';

@Injectable()
export class InitAdmin extends BaseNceJob {
  interval = 0;
  limit = 1;

  constructor(
    @InjectModel(User) private users: Model<typeof User>,
    @InjectModel(Credential)
    private creds: Model<typeof Credential>,
  ) {
    super();
  }
  async run() {
    const admins = await this.users.find({ roles: ROLE.BRAHMIN }).exec();
    if (!admins.length) {
      const user = await this.users.create({
        roles: [ROLE.BRAHMIN],
        name: `admin`,
      });
      await this.creds.create({ user, password: `admin` });
    }
  }
}
