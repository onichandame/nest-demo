import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

import { Id } from '../types';

@ObjectType()
export class Base {
  @FilterableField(() => ID)
  _id!: Id;
}
