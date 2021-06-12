import { prop, modelOptions } from '@typegoose/typegoose';
import { ISODate } from '@kesci/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';

import { Base } from '../base';

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: `CreatedAt`, updatedAt: `UpdatedAt` },
  },
})
export class Timestamp extends Base {
  @FilterableField(() => ISODate)
  @prop()
  CreatedAt!: Date;

  @FilterableField(() => ISODate)
  @prop()
  UpdatedAt!: Date;
}
