import { Injectable, CanActivate } from "@nestjs/common";
import { ROLE } from "@nest-libs/constants";
import { GqlExecutionContext } from "@nestjs/graphql";

import { Context } from "./context";

@Injectable()
export class LoginRequired implements CanActivate {
  canActivate(context: Parameters<CanActivate["canActivate"]>[0]) {
    const ctx = GqlExecutionContext.create(context);
    return !!ctx.getContext<Context>().user;
  }
}

@Injectable()
export class AdminRequired implements CanActivate {
  canActivate(context: Parameters<CanActivate["canActivate"]>[0]) {
    const ctx = GqlExecutionContext.create(context);
    return !!ctx
      .getContext<Context>()
      .user?.roles.some((v) => [ROLE.BRAHMIN, ROLE.KSHATRIYA].includes(v));
  }
}

@Injectable()
export class SuperAdminRequired implements CanActivate {
  canActivate(context: Parameters<CanActivate["canActivate"]>[0]) {
    const ctx = GqlExecutionContext.create(context);
    return !!ctx.getContext<Context>().user?.roles.includes(ROLE.BRAHMIN);
  }
}
