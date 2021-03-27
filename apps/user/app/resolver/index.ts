import { HelloResolver } from "./hello";
import { UserResolver } from "./user";

import { buildSchemaSync } from "type-graphql";

export const schema = buildSchemaSync({
  resolvers: [HelloResolver, UserResolver],
});
