import { prop, index } from '@typegoose/typegoose';
import { ROLE } from '@kesci/constants';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType, Directive } from '@nestjs/graphql';

import { Persistent } from './persistent';
import { Credential } from './credential';

@ObjectType(`User`)
@Directive(`@key(fields: "_id")`)
@index(
  { name: 1 },
  { partialFilterExpression: { Deleted: false }, unique: true }
)
@index(
  { email: 1 },
  { partialFilterExpression: { Deleted: false }, unique: true }
)
export class User extends Persistent {
  @FilterableField()
  @prop({ required: true, unique: true })
  name!: string;

  @FilterableField(() => [ROLE], {
    allowedComparisons: [`eq`, `neq`, `in`, `notIn`],
  })
  @prop({ type: () => [Number], enum: ROLE, default: [ROLE.DALIT] })
  roles!: ROLE[];

  @FilterableField()
  @prop({ required: false })
  email?: string;

  @FilterableField(() => Boolean, { nullable: true })
  @prop({
    localField: `_id`,
    foreignField: `user`,
    ref: () => Credential,
    get: (doc) => !!doc,
    justOne: true,
  })
  activated?: boolean;
}
