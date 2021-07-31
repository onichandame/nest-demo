import { Module } from "@nestjs/common";
import { ModelModule, TypegooseModule, User } from "@nest-libs/model";

import { AuthService } from "./auth.service";
import { SessionService } from "./session.service";

@Module({
  imports: [ModelModule, TypegooseModule.forFeature([User])],
  providers: [AuthService, SessionService],
  exports: [AuthService, SessionService],
})
export class AuthModule {}
