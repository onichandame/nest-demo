import { Column, Entity } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

import { Timestamp } from '../timestamp'

@ObjectType()
@Entity()
export class Credential extends Timestamp {
  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string
}
