import { ObjectType, ID, Directive } from '@nestjs/graphql';
import { ObjectID } from 'mongodb';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ISODate } from '@kesci/graphql';

import { User, StripDocumentProperties } from '@kesci/model';

@ObjectType(`User`)
@Directive(`@key(fields: "_id")`)
export class UserDTO implements StripDocumentProperties<User> {
  @FilterableField(() => ID)
  _id: ObjectID;
  @FilterableField(() => ISODate)
  CreatedAt: Date;
  @FilterableField(() => ISODate)
  UpdatedAt: Date;
  @FilterableField(() => Boolean)
  Deleted: boolean;
  @FilterableField()
  name: string;
  @FilterableField({ nullable: true })
  email?: string;
}
