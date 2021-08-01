import { NestjsGraphql, ClassValidator } from '@nest-libs/deps';
import { User } from '@nest-libs/model';
import { ROLE } from '@nest-libs/constants';
import {
  getFieldAuthorizer,
  SelfRequired,
  RoleRequired,
} from '@nest-libs/auth';

@NestjsGraphql.InputType(`${User.name}Update`)
export class UserUpdateDTO implements Partial<User> {
  @ClassValidator.IsString()
  @ClassValidator.MaxLength(50)
  @ClassValidator.MinLength(5)
  @ClassValidator.IsOptional()
  @NestjsGraphql.Field({
    nullable: true,
    middleware: [
      getFieldAuthorizer({
        or: [
          RoleRequired.create(ROLE.KSHATRIYA),
          SelfRequired.create<User>((user) => user.id),
        ],
      }),
    ],
  })
  name?: string;
  @ClassValidator.IsEmail()
  @ClassValidator.IsOptional()
  @NestjsGraphql.Field({
    nullable: true,
    middleware: [
      getFieldAuthorizer({
        or: [
          RoleRequired.create(ROLE.KSHATRIYA),
          SelfRequired.create<User>((user) => user.id),
        ],
      }),
    ],
  })
  email?: string;
}
