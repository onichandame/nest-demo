import { Query, Args, Resolver, Mutation } from '@nestjs/graphql'
import { ClientProxy } from '@nestjs/microservices'
import { Inject } from '@nestjs/common'

import { User } from '../db'
import { UserLoginArgs, ValidateSessionArgs, UserLogoutArgs } from '../inputs'
import { UserLoginReply, EmptyReply } from '../outputs'
import {
  ClientToken,
  AuthenticateLoginPattern,
  AuthenticateLogoutPattern,
  AuthenticateDeserializeSessionPattern,
} from '../constants'

@Resolver()
export class AuthenticateResolver {
  constructor(@Inject(ClientToken) private client: ClientProxy) {}

  @Mutation(() => UserLoginReply)
  async login(@Args() args: UserLoginArgs): Promise<UserLoginReply> {
    const session = await this.client
      .send(AuthenticateLoginPattern, args)
      .toPromise()
    return { session }
  }

  @Mutation(() => EmptyReply)
  async logout(@Args() args: UserLogoutArgs): Promise<EmptyReply> {
    await this.client.send(AuthenticateLogoutPattern, args).toPromise()
    return { ok: true }
  }

  @Query(() => User)
  async validateSession(@Args() args: ValidateSessionArgs) {
    return this.client.send(AuthenticateDeserializeSessionPattern, args.session)
  }
}
