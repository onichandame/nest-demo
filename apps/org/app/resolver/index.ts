import { HelloResolver } from "./hello";
import { OrgResolver } from "./org";

import { buildSchemaSync } from "type-graphql";

export const schema = buildSchemaSync({
  resolvers: [HelloResolver, OrgResolver],
});
