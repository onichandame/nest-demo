import { Base } from './entity';
import { ID, Directive, ObjectType, Field } from '@nestjs/graphql';

import { Id } from '../types';

@ObjectType()
@Directive(`@extends`)
export class ExternalBase implements Base {
  @Field(() => ID)
  @Directive(`@external`)
  _id!: Id;
}
