import { InputType, Field } from '@nestjs/graphql';
import { ROLE } from '@kesci/constants';
import { StripAutoFields } from '@kesci/model';
import {
  IsEnum,
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserDTO } from './user.dto';

@InputType(`UserCreate`)
export class UserCreateDTO implements StripAutoFields<UserDTO> {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Field()
  name: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsEnum(ROLE, { each: true })
  @Field(() => [ROLE], { defaultValue: [ROLE.SHUDRA] })
  roles: ROLE[];
}
