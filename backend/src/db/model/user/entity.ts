import { Index, Entity, Column } from 'typeorm'
import { Int, Extensions, ObjectType, Field } from '@nestjs/graphql'

import { Role } from '../../../constants'
import { guardFieldForRole } from '../guard'
import { Timestamp } from '../timestamp'

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

  @Field({ nullable: true, middleware: [guardFieldForRole()] })
  @Extensions({ role: Role.ADMIN })
  @Column({ nullable: true })
  password?: string

  @Field(() => [Int], { nullable: true })
  @Column({ nullable: true })
  roles?: Role[]
}
