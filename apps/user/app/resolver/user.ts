import {
  ObjectType,
  Args,
  Field,
  ArgsType,
  Resolver,
  Query,
  Mutation,
} from "type-graphql";

import { Document, db, User } from "../model";

@ArgsType()
@ObjectType()
class CreateArgs implements User {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  email: string;
  @Field(() => String, { nullable: true })
  org: string;
}

@ObjectType()
class FullUser extends CreateArgs implements Document {
  @Field(() => String, { nullable: false })
  id: string;
}

@ArgsType()
class ListArgs implements Partial<CreateArgs> {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  org?: string;
}

@ArgsType()
class GetArgs implements Document {
  @Field(() => String, { nullable: false })
  id: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => FullUser)
  async createUser(@Args() args: CreateArgs) {
    const user = db.getCollection<User>(`user`).create(args);
    return user;
  }
  @Query(() => FullUser)
  async getUser(@Args() { id }: GetArgs) {
    const user = db.getCollection<User>(`user`).findById(id);
    if (!user) throw new Error(`user ${id} not found`);
    else return user;
  }
  @Query(() => [FullUser])
  async listUsers(@Args() filter: ListArgs) {
    const users = db.getCollection<User>(`user`).find(filter);
    return users;
  }
}
