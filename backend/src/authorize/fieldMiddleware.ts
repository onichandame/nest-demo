import { FieldMiddleware, MiddlewareContext } from '@nestjs/graphql'

import { Context, Verb } from '../types'
import { Role } from '../constants'

// return/resolve: passed validation
// throw/reject: failed validation
type Validator = (..._: any[]) => any

type Middleware<TSource = any> = FieldMiddleware<TSource, Context>
type Attribute<TSource = any> = {
  verb?: Verb[] | Verb
  role?: Role
  self?: (ctx: MiddlewareContext<TSource, Context>) => string
  banned?: boolean
  or?: Attribute<TSource>[]
  and?: Attribute<TSource>[]
  validate?(ctx: MiddlewareContext<TSource, Context>): any
}

export const guardFieldForAttribute = <TSource = any>(
  attr: Attribute<TSource> | Attribute<TSource>[]
): Middleware<TSource> => {
  return async (ctx, next) => {
    const validateRole: Validator = async (minRole: Role) => {
      const user = await ctx.context.userPromise
      if (!user?.roles?.some(role => role >= minRole))
        throw new Error(`unauthorized!`)
    }

    const validateSelf: Validator = async (id: string) => {
      const user = await ctx.context.userPromise
      if (!user || user.id.toString() !== id) throw new Error(`not authorized!`)
    }

    const validate = async (currAttr: Attribute<TSource>) => {
      const verbs = !!currAttr.verb
        ? Array.isArray(currAttr.verb)
          ? currAttr.verb
          : [currAttr.verb]
        : []
      if (!verbs.length || verbs.some(verb => ctx.context.verb <= verb)) {
        const validators: Promise<any>[] = []
        if (currAttr.banned)
          throw new Error(`Field ${ctx.info.fieldName} banned!`)
        if (currAttr.or) validators.push(Promise.any(currAttr.or.map(validate)))
        if (currAttr.and)
          validators.push(Promise.all(currAttr.and.map(validate)))
        if (currAttr.role) validators.push(validateRole(currAttr.role))
        if (currAttr.self) validators.push(validateSelf(currAttr.self(ctx)))
        if (currAttr.validate) validators.push(currAttr.validate(ctx))
        await Promise.all(validators)
      }
    }

    const attrs = Array.isArray(attr) ? attr : [attr]
    await Promise.all(attrs.map(attr => validate(attr)))
    return next()
  }
}
