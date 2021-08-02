import { NestjsCommon, NestjsTypegoose } from "@nest-libs/deps";
import { AuthModule } from "@nest-libs/auth";
import { ModelModule, User, Credential } from "@nest-libs/model";

import { LoginResolver } from "./login.resolver";

@NestjsCommon.Module({
  providers: [LoginResolver],
  imports: [
    AuthModule,
    ModelModule,
    NestjsTypegoose.TypegooseModule.forFeature([User, Credential]),
  ],
})
export class AppModule {}
