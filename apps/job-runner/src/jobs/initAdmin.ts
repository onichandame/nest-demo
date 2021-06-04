import { Injectable } from '@nestjs/common';
import { ROLE } from '@kesci/constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Credential, User, StripAutoFields } from '@kesci/model';

import { BaseNceJob } from './base';

@Injectable()
export class InitAdmin extends BaseNceJob {
  interval = 0;
  limit = 1;

  constructor(
    @InjectModel(User.name) private users: Model<StripAutoFields<User>>,
    @InjectModel(Credential.name)
    private creds: Model<StripAutoFields<Credential>>,
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
