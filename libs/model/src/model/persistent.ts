import { prop } from '@typegoose/typegoose';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';

import { Timestamp } from './timestamp';

@ObjectType()
export class Persistent extends Timestamp {
  @FilterableField()
  @prop({ default: false })
  Deleted!: boolean;
}
