import { GraphQLScalarType } from 'graphql';

export const ISODate = new GraphQLScalarType({
  name: `ISODate`,
  serialize: (val) => val.toString(),
  description: `ISO Date`,
});
