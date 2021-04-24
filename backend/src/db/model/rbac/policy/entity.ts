import { OneToOne, Column, Entity } from 'typeorm'

import { RbacAction } from '../../../../constants'
import { Timestamp } from '../../timestamp'
import { RbacObject } from '../object'
import { RbacRole } from '../role'

@Entity()
export class RbacPolicy extends Timestamp {
  @Column({ enum: RbacAction, nullable: false })
  action: RbacAction

  @OneToOne(() => RbacObject, obj => obj.id)
  @Column({ nullable: false })
  object: RbacObject

  @OneToOne(() => RbacRole, role => role.id)
  @Column({ nullable: false })
  role: RbacRole
}
