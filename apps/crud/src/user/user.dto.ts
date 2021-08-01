import { NestjsGraphql, NestjsQueryQueryGraphql } from '@nest-libs/deps';
import { User } from '@nest-libs/model';
import { ROLE } from '@nest-libs/constants';
import {
  getFieldAuthorizer,
  SelfRequired,
  RoleRequired,
} from '@nest-libs/auth';

import { PersistentDTO } from '../base';
import { CredentialDTO } from '../credential/credential.dto';

@NestjsGraphql.ObjectType(User.name)
@NestjsGraphql.Directive(`@key(fields: "id")`)
@NestjsQueryQueryGraphql.CursorConnection(`credentials`, () => CredentialDTO, {
  disableRemove: true,
})
export class UserDTO extends PersistentDTO implements Partial<User> {
  @NestjsQueryQueryGraphql.FilterableField()
  name: string;
  @NestjsQueryQueryGraphql.FilterableField(() => [ROLE], {
    middleware: [
      getFieldAuthorizer({
        or: [
          RoleRequired.create(ROLE.KSHATRIYA),
          SelfRequired.create<User>((user) => user.id),
        ],
      }),
    ],
    allowedComparisons: [`eq`, `neq`, `in`, `notIn`],
  })
  roles: ROLE[];
  @NestjsQueryQueryGraphql.FilterableField({ nullable: true })
  email?: string;
}
