import { ID, Directive, ObjectType, Field } from '@nestjs/graphql';

@ObjectType(`JobRecord`)
@Directive(`@extends`)
export class ExternalJobRecord {
  @Field(() => ID)
  @Directive(`@external`)
  _id!: string;
}
