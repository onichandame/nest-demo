import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@kesci/model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async findUser(id: string) {
    return this.user
      .findById(id)
      .orFail(new Error(`user ${id} not found`))
      .exec();
  }
}
