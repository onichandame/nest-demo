import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { StripAutoFields } from '@kesci/model';

import { UserDTO } from './user.dto';

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
