import { OneToOne, Entity, Column } from 'typeorm'

import { RoleAction } from '../constants'
import { Timestamp } from './timestamp'

@Entity()
export class Role extends Timestamp {
  @Column({ nullable: false })
  name: string

  @Column()
  policies: { target: string; action: RoleAction }[]

  @Column({ nullable: true })
  @OneToOne(() => Role)
  parent?: Role
}
