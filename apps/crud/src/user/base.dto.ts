import { ID, ObjectType, Directive } from '@nestjs/graphql';
import { ROLE } from '@kesci/constants';
import { KeySet, IDField, FilterableField } from '@nestjs-query/query-graphql';
import { User } from '@kesci/model';

@ObjectType(`User`)
@Directive(`@key(fields: "id")`)
@KeySet([`id`])
export class UserDTO implements Partial<User> {
  @IDField(() => ID)
  id: string;
  @FilterableField()
  name: string;
  @FilterableField(() => [ROLE], {
    allowedComparisons: [`eq`, `neq`, `in`, `notIn`],
  })
  roles: ROLE[];
  @FilterableField({ nullable: true })
  email?: string;
}
