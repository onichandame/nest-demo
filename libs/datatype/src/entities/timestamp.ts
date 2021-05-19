import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, GraphQLISODateTime } from '@nestjs/graphql';

import { Base } from './base';

export class Timestamp extends Base {
  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  CreatedAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  UpdatedAt!: Date;
}
