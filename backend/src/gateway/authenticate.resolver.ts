import { Args, Resolver, Mutation } from '@nestjs/graphql'
import { ClientProxy } from '@nestjs/microservices'
import { Inject } from '@nestjs/common'

import { UserLoginArgs } from '../inputs'
import { UserLoginReply } from '../outputs'
import { ClientToken, AuthenticateLoginPattern } from '../constants'

@Resolver()
export class AuthenticateResolver {
  constructor(@Inject(ClientToken) private client: ClientProxy) {}

  @Mutation(() => UserLoginReply)
  async login(@Args() args: UserLoginArgs): Promise<UserLoginReply> {
    return this.client.send(AuthenticateLoginPattern, args).toPromise()
  }
}
