import { OneToOne, Entity, Column } from 'typeorm'

import { Timestamp } from '../../timestamp'

@Entity()
export class RbacRole extends Timestamp {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: true })
  @OneToOne(() => RbacRole)
  parent?: RbacRole
}
