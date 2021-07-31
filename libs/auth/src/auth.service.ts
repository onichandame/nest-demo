import { Injectable } from "@nestjs/common";
import { InjectModel, ReturnModelType, User } from "@nest-libs/model";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private users: ReturnModelType<typeof User>) {}

  async findUser(id: string) {
    return this.users
      .findById(id)
      .orFail(new Error(`user ${id} not found!`))
      .exec();
  }
}
