import { Index, Column, Entity } from 'typeorm'

import { JobStatus } from '../../../constants'
import { Timestamp } from '../timestamp'

@Index([`name`, `instanceId`], { unique: true })
@Entity()
export class JobInstance extends Timestamp {
  @Column()
  name: string

  @Column()
  instanceId: string

  @Column({ enum: JobStatus })
  status: JobStatus

  @Column({ nullable: true })
  output?: string
}
