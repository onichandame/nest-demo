import { NestjsGraphql, NestjsQueryQueryGraphql } from '@nest-libs/deps';
import { ROLE } from '@nest-libs/constants';
import { getFieldAuthorizer, NonDeleted, RoleRequired } from '@nest-libs/auth';
import { Base, Timestamp, Persistent } from '@nest-libs/model';

@NestjsGraphql.ObjectType({ isAbstract: true })
export abstract class BaseDTO implements Partial<Base> {
  @NestjsQueryQueryGraphql.FilterableField(() => NestjsGraphql.ID, {
    middleware: [
      getFieldAuthorizer({
        or: [NonDeleted.create(), RoleRequired.create(ROLE.KSHATRIYA)],
      }),
    ],
  })
  id: string;
}

@NestjsGraphql.ObjectType({ isAbstract: true })
export abstract class TimestampDTO
  extends BaseDTO
  implements Partial<Timestamp>
{
  @NestjsQueryQueryGraphql.FilterableField(
    () => NestjsGraphql.GraphQLISODateTime,
  )
  createdAt: Date;
  @NestjsQueryQueryGraphql.FilterableField(
    () => NestjsGraphql.GraphQLISODateTime,
  )
  updatedAt: Date;
}

@NestjsGraphql.ObjectType({ isAbstract: true })
export abstract class PersistentDTO
  extends TimestampDTO
  implements Partial<Persistent>
{
  @NestjsQueryQueryGraphql.FilterableField(
    () => NestjsGraphql.GraphQLISODateTime,
    { nullable: true },
  )
  deletedAt?: Date;
}
