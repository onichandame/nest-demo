import {
  ObjectType,
  Args,
  Field,
  ArgsType,
  Resolver,
  Query,
  Mutation,
} from "type-graphql";

import { Document, db, Org } from "../model";

@ArgsType()
@ObjectType()
class OrgType implements Org {
  @Field(() => String, { nullable: false })
  name: string;
}

@ObjectType()
class FullOrg extends OrgType implements Document {
  @Field(() => String, { nullable: false })
  id: string;
}

@ArgsType()
class ListArgs implements Partial<OrgType> {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  email?: string;
}

@ArgsType()
class GetArgs implements Document {
  @Field(() => String, { nullable: false })
  id: string;
}

@Resolver()
export class OrgResolver {
  @Mutation(() => FullOrg)
  async createOrg(@Args() args: OrgType) {
    const user = db.getCollection<Org>(`org`).create(args);
    return user;
  }
  @Query(() => FullOrg)
  async getOrg(@Args() { id }: GetArgs) {
    const org = db.getCollection<Org>(`org`).findById(id);
    if (!org) throw new Error(`org ${id} not found`);
    else return org;
  }
  @Query(() => [FullOrg])
  async listOrgs(@Args() filter: ListArgs) {
    const orgs = db.getCollection<Org>(`org`).find(filter);
    return orgs;
  }
}
