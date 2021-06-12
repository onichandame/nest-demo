import {
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { User } from './entity';

@InputType(`UserUpdate`)
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
