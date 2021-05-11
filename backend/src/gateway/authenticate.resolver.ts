import { Query, Args, Resolver, Mutation } from '@nestjs/graphql'
import { ClientProxy } from '@nestjs/microservices'
import { Inject } from '@nestjs/common'

import { User } from '../db'
import { UserLoginArgs, ValidateSessionArgs, UserLogoutArgs } from '../inputs'
import { UserLoginReply } from '../outputs'
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

  @Mutation()
  async logout(@Args() args: UserLogoutArgs) {
    return this.client.send(AuthenticateLogoutPattern, args)
  }

  @Query(() => User)
  async validateSession(@Args() args: ValidateSessionArgs) {
    return this.client.send(AuthenticateDeserializeSessionPattern, args.session)
  }
}
