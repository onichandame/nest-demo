import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class StatusResolver {
  @Query(() => String)
  readiness() {
    return `OK`
  }
}
