import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Plugin } from '@nestjs/graphql'

import { Context, Verb } from '../types'
import { User } from '../db'
import {
  ClientToken,
  AuthenticateDeserializeSessionPattern,
} from '../constants'

const verbMapper = (verb: string) => {
  switch (verb) {
    case `create`:
      return Verb.CREATE
    case `get`:
    case `list`:
      return Verb.READ
    case `update`:
      return Verb.UPDATE
    case `delete`:
      return Verb.DELETE
    default:
      return Verb.UNKOWN
  }
}

@Plugin()
export class GatewayAuthenticatePlugin implements ApolloServerPlugin {
  constructor(@Inject(ClientToken) private client: ClientProxy) {}

  private async deserializeSession(sessionKey: string): Promise<User> {
    try {
      const user = await this.client
        .send(AuthenticateDeserializeSessionPattern, sessionKey)
        .toPromise()
      return user
    } catch (e) {
      console.error(e)
      return null
    }
  }

  private getVerb(methodName: string) {
    const verb = methodName.split(/(?=[A-Z])/).map(val => val.toLowerCase())[0]
    return verbMapper(verb)
  }

  requestDidStart(ctx: GraphQLRequestContext<Context>): GraphQLRequestListener {
    console.log(ctx.request.operationName)
    ctx.context.verb = this.getVerb(ctx.request.operationName)
    const sessionKey = ctx.request.variables.session
    ctx.context.session = sessionKey
    if (sessionKey)
      ctx.context.userPromise = this.deserializeSession(sessionKey)
    return
  }
}
