import { NestjsGraphql, ClassValidator } from '@nest-libs/deps';
import { User } from '@nest-libs/model';

@NestjsGraphql.InputType(`${User.name}Create`)
export class UserCreateDTO implements Partial<User> {
  @ClassValidator.IsString()
  @NestjsGraphql.Field()
  name!: string;
  @ClassValidator.IsOptional()
  @ClassValidator.IsEmail()
  @NestjsGraphql.Field({ nullable: true })
  email?: string;
}
