import { ObjectType, ID, Directive } from '@nestjs/graphql';
import { ROLE } from '@kesci/constants';
import { Authorize, FilterableField } from '@nestjs-query/query-graphql';
import { ISODate } from '@kesci/graphql';
import { Id, User, StripDocumentProperties } from '@kesci/model';

@ObjectType(`User`)
@Directive(`@key(fields: "_id")`)
@Authorize<UserDTO>({
  authorize: async (ctx: { user?: User }) => {
    if (
      !ctx.user ||
      !ctx.user.roles.some((role) =>
        [ROLE.BRAHMIN, ROLE.KSHATRIYA].includes(role),
      )
    )
      return { Deleted: { is: false } };
  },
})
export class UserDTO implements StripDocumentProperties<User> {
  @FilterableField(() => ID)
  _id: Id;
  @FilterableField(() => ISODate)
  CreatedAt: Date;
  @FilterableField(() => ISODate)
  UpdatedAt: Date;
  @FilterableField(() => Boolean)
  Deleted: boolean;
  @FilterableField()
  name: string;
  @FilterableField({ nullable: true })
  email?: string;
  @FilterableField(() => [ROLE], {
    allowedComparisons: [`eq`, `neq`, `in`, `notIn`],
  })
  roles: ROLE[];
}
