import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType()
export class Base {
  @FilterableField(() => ID)
  _id!: string;
}
