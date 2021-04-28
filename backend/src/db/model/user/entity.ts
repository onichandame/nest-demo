import { Index, OneToMany, Entity, Column } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

import { Timestamp } from '../timestamp'
import { RbacRole } from '../rbac'

@ObjectType()
@Entity({})
export class User extends Timestamp {
  @Field()
  @Index({ unique: true })
  @Column({ nullable: false })
  name: string

  @Field()
  @Index({ unique: true })
  @Column({ nullable: false })
  email: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string

  @Field(() => [RbacRole], { nullable: true })
  @OneToMany(() => RbacRole, role => role.id)
  @Column({ nullable: true })
  roles?: RbacRole[]
}
