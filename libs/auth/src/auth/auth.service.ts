import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@kesci/model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private users: Model<User>) {}
  async getUser(id: string) {
    return this.users
      .findById(id)
      .orFail(new Error(`用户${id}找不到`))
      .exec();
  }
}
