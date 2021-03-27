import {
  PubSubEngine,
  PubSub,
  Resolver,
  Args,
  ArgsType,
  Field,
  Mutation,
} from "type-graphql";

const buffer: { [name: string]: number } = {};

@ArgsType()
class CounterArgs {
  @Field(() => String, { nullable: false })
  name: string;
}

@Resolver()
export class Counter {
  @Mutation(() => Number)
  async increment(
    @Args() { name }: CounterArgs,
    @PubSub() pubsub: PubSubEngine
  ) {
    buffer[name] = (buffer[name] || 0) + 1;
    pubsub.publish(name, buffer[name]);
    return buffer[name];
  }
  @Mutation(() => Number)
  async decrement(
    @Args() { name }: CounterArgs,
    @PubSub() pubsub: PubSubEngine
  ) {
    buffer[name] = (buffer[name] || 0) - 1;
    pubsub.publish(name, buffer[name]);
    return buffer[name];
  }
}
