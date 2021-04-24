import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import {
  FindConditions,
  EntityTarget,
  EntityManager,
  DeepPartial,
  FindManyOptions,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { ListArgs } from '../../../types'

@Injectable()
export class DbModelHelperService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  private parseCommonListOptions(args: ListArgs = {}) {
    const result: FindManyOptions = {}
    if (!args.noPaging) {
      // pagination
      result.take = args.perPage || 10
      if (args.page) result.skip = result.take * args.page
    }
    return result
  }

  createFactory<T>(model: EntityTarget<T>) {
    return async (args: DeepPartial<T>) =>
      this.entityManager.save(this.entityManager.create(model, args))
  }

  findFactory<T>(model: EntityTarget<T>) {
    return async (args: { conditions?: FindConditions<T>; opts?: ListArgs }) =>
      this.entityManager.find(
        model,
        Object.assign(
          {},
          this.parseCommonListOptions(args.opts),
          args.conditions
        )
      )
  }

  updateFactory<T>(model: EntityTarget<T>) {
    return async (
      conditions: FindConditions<T>,
      partialDoc: QueryDeepPartialEntity<T>
    ) => {
      return this.entityManager.update(model, conditions, partialDoc)
    }
  }

  deleteFactory<T>(model: EntityTarget<T>) {
    return async (conditions: FindConditions<T>) =>
      this.entityManager.delete(model, conditions)
  }
}
