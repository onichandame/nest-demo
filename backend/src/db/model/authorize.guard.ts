import { FieldMiddleware } from '@nestjs/graphql'

import { Context } from '../../types'
import { Role } from '../../constants'

type Middleware = FieldMiddleware<any, Context>
type Attribute = {
  role?: Role
  or?: Attribute[]
  and?: Attribute[]
  validate?(): any
}

export const guardFieldForAttribute = (attr: Attribute): Middleware => {
  return async (ctx, next) => {
    const validateRole = async (minRole: Role) => {
      const user = await ctx.context.userPromise
      if (!user?.roles?.some(role => role >= minRole))
        throw new Error(`unauthorized!`)
    }

    const validate = async (currAttr: Attribute) => {
      const validators: Promise<any>[] = []
      if (currAttr.or) validators.push(Promise.any(currAttr.or.map(validate)))
      if (currAttr.and) validators.push(Promise.all(currAttr.and.map(validate)))
      if (currAttr.role) validators.push(validateRole(currAttr.role))
      if (currAttr.validate) validators.push(currAttr.validate())
      await Promise.all(validators)
    }

    await validate(attr)
    next()
  }
}
