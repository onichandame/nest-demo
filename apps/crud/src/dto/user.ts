import {
  ClassValidator,
  NestjsGraphql,
  NestjsQueryQueryGraphql,
} from '@nest-libs/deps';
import { ROLE } from '@nest-libs/constants';
import { User } from '@nest-libs/model';

@NestjsGraphql.ObjectType(User.name)
@NestjsGraphql.Directive(`@key(fields: "_id")`)
export class UserDTO implements Partial<User> {
  @NestjsQueryQueryGraphql.FilterableField(() => NestjsGraphql.ID)
  _id: any;
  @NestjsQueryQueryGraphql.FilterableField()
  name: string;
  @NestjsQueryQueryGraphql.FilterableField(() => [ROLE], {
    allowedComparisons: [`eq`, `neq`, `in`, `notIn`],
  })
  roles: ROLE[];
  @NestjsQueryQueryGraphql.FilterableField({ nullable: true })
  email?: string;
}

@NestjsGraphql.InputType(`${User.name}Update`)
export class UserUpdateDTO implements Partial<User> {
  @ClassValidator.IsString()
  @ClassValidator.MaxLength(50)
  @ClassValidator.MinLength(5)
  @ClassValidator.IsOptional()
  @NestjsGraphql.Field({ nullable: true })
  name?: string;
  @ClassValidator.IsEmail()
  @ClassValidator.IsOptional()
  @NestjsGraphql.Field({ nullable: true })
  email?: string;
}

@NestjsGraphql.InputType(`${User.name}Create`)
export class UserCreateDTO {
  @ClassValidator.IsString()
  @NestjsGraphql.Field()
  name!: string;
}
