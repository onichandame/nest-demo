import { OneToMany, Entity, Column } from 'typeorm'

import { Timestamp } from './timestamp'
import { Role } from './role'

@Entity({})
export class User extends Timestamp {
  @Column({ unique: true })
  name: string

  @OneToMany(() => Role, role => role.id)
  @Column({ nullable: true })
  roles: Role[]
}
