import { Field, ID, InputType, ObjectType, Directive } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ROLE } from '@nest-libs/constants';
import { FilterableField } from '@nestjs-query/query-graphql';
import { User } from '@nest-libs/model';

@ObjectType(User.name)
@Directive(`@key(fields: "_id")`)
export class UserDTO implements Partial<User> {
  @FilterableField(() => ID)
  _id: any;
  @FilterableField()
  name: string;
  @FilterableField(() => [ROLE], {
    allowedComparisons: [`eq`, `neq`, `in`, `notIn`],
  })
  roles: ROLE[];
  @FilterableField({ nullable: true })
  email?: string;
}

@InputType(`${User.name}Update`)
export class UserUpdateDTO implements Partial<User> {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @IsOptional()
  @Field({ nullable: true })
  name?: string;
  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;
}

@InputType(`${User.name}Create`)
export class UserCreateDTO {
  @IsString()
  @Field()
  name!: string;
}
