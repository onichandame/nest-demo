import { ObjectIdColumn, ObjectID } from 'typeorm';
import { Field, ID } from '@nestjs/graphql';

export class Base {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: ObjectID;
}
