import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Base } from './base'

export class Timestamp extends Base {
  @CreateDateColumn({ nullable: false })
  CreatedAt: Date
  @UpdateDateColumn({ nullable: true })
  UpdatedAt?: Date
}
