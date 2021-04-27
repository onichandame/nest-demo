import { Index, OneToMany, OneToOne, Entity, Column } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

import { Credential } from '../credential'
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
  @OneToOne(() => Credential)
  @Column({ nullable: true })
  credential?: Credential

  @Field(() => [RbacRole], { nullable: true })
  @OneToMany(() => RbacRole, role => role.id)
  @Column({ nullable: true })
  roles?: RbacRole[]
}
