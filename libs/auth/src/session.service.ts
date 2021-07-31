import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { IsString, validateOrReject } from "class-validator";
import { jwtToken } from "@nest-libs/constants";
import { verify } from "jsonwebtoken";

class Session {
  @IsString()
  user!: string;
}

@Injectable()
export class SessionService {
  async deserialize(jwt: string) {
    const session = plainToClass(Session, verify(jwt, jwtToken));
    validateOrReject(session);
    return session;
  }
}
