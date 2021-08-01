import { NestjsGraphql, NestjsQueryQueryGraphql } from '@nest-libs/deps';
import { Credential } from '@nest-libs/model';

import { PersistentDTO } from '../base';
import { UserDTO } from '../user/user.dto';

@NestjsGraphql.ObjectType(Credential.name)
@NestjsGraphql.Directive(`@key(fields: "id")`)
@NestjsQueryQueryGraphql.FilterableRelation(`user`, () => UserDTO, {
  disableRemove: true,
  disableUpdate: true,
})
export class CredentialDTO
  extends PersistentDTO
  implements Partial<Credential>
{
  @NestjsQueryQueryGraphql.FilterableField(() => NestjsGraphql.ID)
  user: Credential['user'];
}
