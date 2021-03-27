import { Args, Field, ArgsType, Resolver, Query } from "type-graphql";

@ArgsType()
class HelloArgs {
  @Field(() => String, { defaultValue: `stranger` })
  name: string;
}

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(@Args() args: HelloArgs) {
    return `Hello ${args.name}`;
  }
}
