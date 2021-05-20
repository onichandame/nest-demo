import { ObjectType, ID, GraphQLISODateTime, Directive } from '@nestjs/graphql';
import { ObjectID } from 'mongodb';
import { FilterableField } from '@nestjs-query/query-graphql';
import { StripDocumentProperties } from '@kesci/datatype';

import { User } from '../user.entity';

@ObjectType(`User`)
@Directive(`@key(fields: "_id")`)
export class UserDTO implements StripDocumentProperties<User> {
  @FilterableField(() => ID)
  _id: ObjectID;
  @FilterableField(() => GraphQLISODateTime)
  CreatedAt: Date;
  @FilterableField(() => GraphQLISODateTime)
  UpdatedAt: Date;
  @FilterableField()
  name: string;
  @FilterableField({ nullable: true })
  email?: string;
}
