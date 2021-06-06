import { InputType, Field, ObjectType, ID, Directive } from "@nestjs/graphql";
import {
  IsEnum,
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";
import { ROLE } from "@kesci/constants";
import { Authorize, FilterableField } from "@nestjs-query/query-graphql";
import { ISODate } from "@kesci/graphql";
import {
  StripAutoFields,
  Id,
  User,
  StripDocumentProperties,
} from "@kesci/model";

@ObjectType(`User`)
@Directive(`@key(fields: "_id")`)
@Authorize<UserDTO>({
  authorize: async (ctx: { user?: User }) => {
    if (
      !ctx.user ||
      !ctx.user.roles.some((role) =>
        [ROLE.BRAHMIN, ROLE.KSHATRIYA].includes(role)
      )
    )
      return { Deleted: { is: false } };
    else return {};
  },
})
export class UserDTO implements StripDocumentProperties<User> {
  @FilterableField(() => ID)
  _id!: Id;
  @FilterableField(() => ISODate)
  CreatedAt!: Date;
  @FilterableField(() => ISODate)
  UpdatedAt!: Date;
  @FilterableField(() => Boolean)
  Deleted!: boolean;
  @FilterableField()
  name!: string;
  @FilterableField({ nullable: true })
  email?: string;
  @FilterableField(() => [ROLE], {
    allowedComparisons: [`eq`, `neq`, `in`, `notIn`],
  })
  roles!: ROLE[];
}

@InputType(`UserCreate`)
export class UserCreateDTO implements StripAutoFields<UserDTO> {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Field()
  name!: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsEnum(ROLE, { each: true })
  @Field(() => [ROLE], { defaultValue: [ROLE.SHUDRA] })
  roles!: ROLE[];
}

@InputType(`UserUpdate`)
export class UserUpdateDTO implements Partial<StripAutoFields<UserDTO>> {
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
