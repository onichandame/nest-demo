import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class StatusResolver {
  @Query(() => String)
  status() {
    return `OK`
  }
}
