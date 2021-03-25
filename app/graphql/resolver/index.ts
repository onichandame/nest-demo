import { Hello } from "./hello";

import { buildSchemaSync } from "type-graphql";

export const schema = buildSchemaSync({ resolvers: [Hello] });
