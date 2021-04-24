import { Index, OneToMany, Entity, Column } from 'typeorm'

import { Timestamp } from '../timestamp'
import { RbacRole } from '../rbac'

@Entity({})
export class User extends Timestamp {
  @Index({ unique: true })
  @Column({ nullable: false })
  name: string

  @Index({ unique: true })
  @Column({ nullable: false })
  email: string

  @Column({ default: `` })
  password: string

  @OneToMany(() => RbacRole, role => role.id)
  @Column({ default: [] })
  roles: RbacRole[]
}
