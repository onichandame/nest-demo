import { ROLE } from "@nest-libs/constants";
import { NestjsGraphql, NestjsCommon } from "@nest-libs/deps";

import { Context } from "./context";

@NestjsCommon.Injectable()
export class LoginRequired implements NestjsCommon.CanActivate {
  canActivate(context: Parameters<NestjsCommon.CanActivate["canActivate"]>[0]) {
    const ctx = NestjsGraphql.GqlExecutionContext.create(context);
    return !!ctx.getContext<Context>().user;
  }
}

@NestjsCommon.Injectable()
export class AdminRequired implements NestjsCommon.CanActivate {
  canActivate(context: Parameters<NestjsCommon.CanActivate["canActivate"]>[0]) {
    const ctx = NestjsGraphql.GqlExecutionContext.create(context);
    return !!ctx
      .getContext<Context>()
      .user?.roles.some((v) => [ROLE.BRAHMIN, ROLE.KSHATRIYA].includes(v));
  }
}

@NestjsCommon.Injectable()
export class SuperAdminRequired implements NestjsCommon.CanActivate {
  canActivate(context: Parameters<NestjsCommon.CanActivate["canActivate"]>[0]) {
    const ctx = NestjsGraphql.GqlExecutionContext.create(context);
    return !!ctx.getContext<Context>().user?.roles.includes(ROLE.BRAHMIN);
  }
}
