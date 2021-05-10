import { Query, Args, Resolver, Mutation } from '@nestjs/graphql'
import { ClientProxy } from '@nestjs/microservices'
import { Inject } from '@nestjs/common'

import { User } from '../db'
import { UserLoginArgs, ValidateSessionArgs } from '../inputs'
import { UserLoginReply } from '../outputs'
import {
  ClientToken,
  AuthenticateLoginPattern,
  AuthenticateDeserializeSessionPattern,
} from '../constants'

@Resolver()
export class AuthenticateResolver {
  constructor(@Inject(ClientToken) private client: ClientProxy) {}

  @Mutation(() => UserLoginReply)
  async login(@Args() args: UserLoginArgs): Promise<UserLoginReply> {
    return this.client.send(AuthenticateLoginPattern, args).toPromise()
  }

  @Query(() => User)
  async validateSession(@Args() args: ValidateSessionArgs) {
    return this.client.send(AuthenticateDeserializeSessionPattern, args.session)
  }
}
