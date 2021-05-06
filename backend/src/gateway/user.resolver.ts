import { Args, Query, Mutation, Resolver } from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { User } from '../db'
import { UserRegisterArgs, UserListArgs } from '../inputs'
import { ClientToken, UserRegisterPattern, UserListPattern } from '../constants'

@Resolver()
export class UserResolver {
  constructor(@Inject(ClientToken) private client: ClientProxy) {}

  @Mutation(() => User)
  async registerUser(@Args() args: UserRegisterArgs): Promise<User> {
    return this.client.send(UserRegisterPattern, args).toPromise()
  }

  @Query(() => [User])
  async listUsers(@Args() args: UserListArgs): Promise<User[]> {
    return this.client.send(UserListPattern, { ...args }).toPromise()
  }
}
