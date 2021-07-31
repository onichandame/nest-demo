import { ModelModule, User } from "@nest-libs/model";
import { NestjsCommon, NestjsTypegoose } from "@nest-libs/deps";

import { AuthService } from "./auth.service";
import { SessionService } from "./session.service";

@NestjsCommon.Module({
  imports: [ModelModule, NestjsTypegoose.TypegooseModule.forFeature([User])],
  providers: [AuthService, SessionService],
  exports: [AuthService, SessionService],
})
export class AuthModule {}
