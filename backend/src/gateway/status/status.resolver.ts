import { Query, Subscription, Resolver } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

setInterval(() => {
  pubSub.publish(`live`, Date.now() % 2 ? `I'm` : `OK`)
}, 1000)

@Resolver()
export class StatusResolver {
  @Query(() => String)
  readiness() {
    return `OK`
  }
  @Subscription(() => String)
  liveness() {
    return pubSub.asyncIterator(`live`)
  }
}
