import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Plugin } from '@nestjs/graphql'

import { User } from '../db'
import {
  ClientToken,
  AuthenticateDeserializeSessionPattern,
} from '../constants'

@Plugin()
export class GatewayAuthenticatePlugin implements ApolloServerPlugin {
  constructor(@Inject(ClientToken) private client: ClientProxy) {}

  private async deserializeSession(sessionKey: string): Promise<User> {
    const user = await this.client
      .send(AuthenticateDeserializeSessionPattern, sessionKey)
      .toPromise()
    return user
  }

  requestDidStart(ctx: GraphQLRequestContext): GraphQLRequestListener {
    const sessionKey = ctx.request.variables.session
    ctx.context.session = sessionKey
    if (sessionKey)
      ctx.context.userPromise = this.deserializeSession(sessionKey).catch(e => {
        ctx.logger.warn(e)
        delete ctx.context.session
        delete ctx.context.userPromise
      })
    return
  }
}
