import { Index, OneToOne, Entity, Column } from 'typeorm'

import { Timestamp } from '../../timestamp'

@Entity()
export class RbacObject extends Timestamp {
  @Index()
  @Column({ nullable: false })
  name: string

  @Column({ nullable: true })
  @OneToOne(() => RbacObject)
  parent?: RbacObject
}
