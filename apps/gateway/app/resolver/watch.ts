import {
  ObjectType,
  Root,
  Args,
  ArgsType,
  Field,
  Resolver,
  Subscription,
} from "type-graphql";

@ArgsType()
class WatchArgs {
  @Field(() => String, { nullable: false })
  name: string;
}

@ObjectType()
class Response {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => Number, { nullable: false })
  count: number;
}

@Resolver()
export class Watch {
  @Subscription({ topics: ({ args }) => args.name })
  watch(@Root() count: number, @Args() { name }: WatchArgs): Response {
    return { name, count };
  }
}
