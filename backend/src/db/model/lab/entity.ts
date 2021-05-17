import { JoinColumn, ObjectID, ManyToOne, Entity, Column } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

import { Timestamp } from '../timestamp'
import { User } from '../user'

@ObjectType()
@Entity()
export class Lab extends Timestamp {
  @Field()
  @Column({ nullable: false })
  title: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: `user` })
  user: ObjectID
}
