import { OneToOne, Entity, Column } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import { Timestamp } from '../../timestamp'

@ObjectType()
@Entity()
export class RbacRole extends Timestamp {
  @Field()
  @Column({ nullable: false })
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  @OneToOne(() => RbacRole)
  parent?: RbacRole
}
