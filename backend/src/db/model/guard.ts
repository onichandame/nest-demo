import { MiddlewareContext, NextFn } from '@nestjs/graphql'

import { User } from './user'

export const guardFieldForRole = () => {
  return async (ctx: MiddlewareContext, next: NextFn) => {
    const { info, context } = ctx
    const { extensions } = info.parentType.getFields()[info.fieldName]

    const minRole = extensions.role
    const userPromise = (context as any).userPromise
    let user: User = null
    if (userPromise) user = await userPromise
    if (minRole && typeof minRole === `number`)
      if (!user.roles?.some(role => role >= minRole))
        throw new Error(`unauthorized!`)

    return next()
  }
}
