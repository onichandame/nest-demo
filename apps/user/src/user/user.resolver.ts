import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';

import { User } from './user.data';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private svc: UserService) {}

  @Query(() => User)
  async getUser(@Args(`id`) id: string) {
    return this.svc.findById(id);
  }

  @ResolveReference()
  resolveRef(ref: { __typename: string; id: string }): Promise<User> {
    return this.svc.findById(ref.id);
  }
}
