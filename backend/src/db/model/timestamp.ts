import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import { Base } from './base'

@ObjectType()
export class Timestamp extends Base {
  @Field()
  @CreateDateColumn()
  CreatedAt: Date

  @Field()
  @UpdateDateColumn()
  UpdatedAt: Date
}
