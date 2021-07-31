import { jwtToken } from "@nest-libs/constants";
import {
  jsonwebtoken,
  NestjsCommon,
  ClassValidator,
  ClassTransformer,
} from "@nest-libs/deps";

class Session {
  @ClassValidator.IsString()
  user!: string;
}

@NestjsCommon.Injectable()
export class SessionService {
  async deserialize(jwt: string) {
    const session = ClassTransformer.plainToClass(
      Session,
      jsonwebtoken.verify(jwt, jwtToken)
    );
    await ClassValidator.validateOrReject(session);
    return session;
  }
}
