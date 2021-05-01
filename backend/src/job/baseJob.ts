import { EntityManager } from 'typeorm'
import { parseExpression } from 'cron-parser'

export abstract class BaseJob {
  cron?: string
  activate?: boolean
  immediate?: boolean

  constructor(protected db: EntityManager) {}

  abstract run(): any

  get interval() {
    return !!this.cron ? parseExpression(this.cron) : null
  }
}
