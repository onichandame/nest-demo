import { NestjsGraphql } from "@nest-libs/deps";
import { ROLE } from "@nest-libs/constants";
import { Persistent } from "@nest-libs/model";

import { Context } from "./context";

abstract class FieldAuthorizer {
  ctx?: NestjsGraphql.MiddlewareContext<{}, Context>;
  abstract authorize(): void | Promise<void>;
}

type CompositeAuthorizer =
  | {
      or?: (FieldAuthorizer | CompositeAuthorizer)[];
      and?: (FieldAuthorizer | CompositeAuthorizer)[];
    }
  | FieldAuthorizer;

export const getFieldAuthorizer = (authorizer: CompositeAuthorizer) => {
  return (async (ctx, next) => {
    const comprehend = (auth: typeof authorizer) => {
      if (auth instanceof FieldAuthorizer) {
        auth.ctx = ctx;
      } else {
        for (const auths of Object.values(auth)) {
          auths.forEach((auth) => comprehend(auth));
        }
      }
    };
    const authorize = async (auth: typeof authorizer) => {
      if (auth instanceof FieldAuthorizer) {
        await auth.authorize();
      } else {
        await Promise.all([
          Promise.all(auth.and?.map((a) => authorize(a)) || []),
          Promise.any(auth.or?.map((a) => authorize(a)) || []).catch((e) => {
            throw new Error(e.errors.map((e: Error) => e.message).join(`; `));
          }),
        ]);
      }
    };
    comprehend(authorizer);
    await authorize(authorizer);
    await next();
  }) as NestjsGraphql.FieldMiddleware;
};

export class RoleRequired extends FieldAuthorizer {
  private constructor(private role: ROLE) {
    super();
  }
  static create(role: ROLE) {
    return new this(role);
  }
  authorize() {
    if (!this.ctx?.context.user?.roles.some((v) => v >= this.role))
      throw new Error(
        `field ${this.ctx?.info.fieldName} requires at least ${ROLE[this.role]}`
      );
  }
}

export class SelfRequired<TSource> extends FieldAuthorizer {
  private constructor(private getSelfId: (source: TSource) => string) {
    super();
  }
  static create<TSource = any>(getSelfId: (source: TSource) => string) {
    return new this<TSource>(getSelfId);
  }
  authorize() {
    if (
      !(
        this.ctx &&
        this.ctx.context.user?.id === this.getSelfId(this.ctx.source as TSource)
      )
    )
      throw new Error(
        `field ${this.ctx?.info.fieldName} requires owner logged in`
      );
  }
}

export class NonDeleted<TSource extends Persistent> extends FieldAuthorizer {
  static create<TSource extends Persistent = any>() {
    return new this<TSource>();
  }
  authorize() {
    if (!(this.ctx && !(this.ctx.source as TSource)?.deletedAt))
      throw new Error(`deleted record cannot be queried!`);
  }
}
