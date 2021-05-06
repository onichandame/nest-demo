import { Index, Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import { hash } from 'bcryptjs'
import { Int, ObjectType, Field } from '@nestjs/graphql'

import { Role } from '../../../constants'
import { Verb } from '../../../types'
import { guardFieldForAttribute } from '../../../authorize'
import { Timestamp } from '../timestamp'

@ObjectType()
@Entity({})
export class User extends Timestamp {
  @Field()
  @Index({ unique: true })
  @Column({ nullable: false })
  name: string

  @Field({ nullable: true })
  @Index({ unique: true })
  @Column({ nullable: true })
  email?: string

  @Field({
    nullable: true,
    middleware: [guardFieldForAttribute({ banned: true })],
  })
  @Column({ nullable: true })
  password?: string

  @Field(() => [Int], {
    nullable: true,
    middleware: [
      guardFieldForAttribute<User>({
        verb: Verb.READ,
        or: [{ role: Role.ADMIN }, { self: ctx => ctx.source.id.toString() }],
      }),
    ],
  })
  @Column({ nullable: true })
  roles?: Role[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPass() {
    this.password = await hash(this.password, 8)
  }
}
